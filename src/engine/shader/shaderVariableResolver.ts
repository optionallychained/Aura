import { FlatColor, Model, MultiColor } from '../component';
import { Transform2D } from '../component/2d';
import { Transform3D } from '../component/3d';
import { ProtoGLError } from '../core';
import { Entity } from '../entity/entity'
import { WebGLRenderer } from '../renderer';
import { UniformVariation } from './uniformVariation.enum';

/** Internal-use utility type defining a 'static' shader variable resolution function */
type StaticShaderVariableResolver = () => Float32Array | number;

/** Internal-use utility type defining an 'entity' shader variable resolution function */
type EntityShaderVariableResolver = (e: Entity) => Float32Array | number;

/** External-use utility union of the two resolution function types */
export type VariableResolver = StaticShaderVariableResolver | EntityShaderVariableResolver;

/**
 * Utility class for automatically retrieving attribute and uniform shader values from Entities, Components and other Game constructs
 *
 * Forms a critical aspect of the system's rendering approach, where Entities are able to specify their own Shaders. Utilised by the
 *   EntityManager in the construction of Vertex Buffers by way of inspecting Shader Attribute specifications, and by the WebGLRenderer in
 *   the upload of Shader Uniform values
 *
 * The mappings of <shaderVariableName => ResolutionFunction> define a set of standardised variable names available for use in Vertex and
 *   Fragment Shaders and the method by which they will be retrieved for weaving into vertex lists and uploading as uniforms
 *
 * While variable names defined in the Mappings may be used in the specification of both attributes and uniforms, the mappings themselves
 *   are split by the various 'UniformVariation' types. This is to facilitate an optimisation in the WebGLRenderer, which aims to upload
 *   uniforms only as often as they may change, and to better lock down the type and data retrieval method of a given resolution function
 *
 *
 * Allows for the registration of new mappings at application init, facilitating system extension by way of custom Shaders, Components
 *   and Game structures
 *
 * Handles errors in the absence of resolution functions for given names, and in the absence of retrieved values
 *
 *
 * // TODO this is a minor mess of a class and its implementation details mix a couple of should-be-unrelated concerns as a first-idea
 * //   overall solution to the generalised handling of the different 'classes' of shader data
 *
 * // It may be overall better and clearer to split mappings by use-as-attribute and use-as-uniform (w/ uniform subtypes), even if
 * //   there would end up crossover between the mappings. Come back to this and reconsider the ideal layout/API for shader value resolution
 *
 * // NB: The introduction/requirement of non-Entity-related values entirely predicated the difference between the UniformVariations and
 * //   the current mapping split. This probably means some work is desired to unpick the various use-cases
 */
export class ShaderVariableResolver {

    /**
     * The internal map of Shader Variable Name => Resolution function for 'static' shader data (uniforms)
     *
     * This list sets out built-in names that may be used in the specification of non-Entity-associated uniforms
     *
     * 'static' uniforms vary per render call, and are defined with UniformVariation.STATIC
     */
    private static STATIC_MAPPINGS = new Map<string, StaticShaderVariableResolver>([
        [
            'Projection',
            () => WebGLRenderer.PROJECTION.float32Array
        ],
        [
            'View',
            () => WebGLRenderer.VIEW.float32Array
        ],
        [
            'Texture',
            () => WebGLRenderer.ACTIVE_TEXTURE_UNIT
        ]
    ]);

    /**
     * The internal map of Shader Variable Name => Resolution function for 'entity' shader data (uniforms + attributes)
     *
     * This list sets out built-in names that may be used in the specification of both attributes and Entity-associated uniforms
     *
     * 'entity' uniforms vary per Entity within a render call, and are defined with UniformVariation.ENTITY
     *
     * Attributes implicitly vary per Entity and are retrieved in vertex complication by the EntityManager. Mappings for Attributes are
     *   also designated with UniformVariation.ENTITY so as to filter them into the proper list
     *
     * // TODO this crossover and especially the requirement of UniformVariation for attributes speaks to the // TODO above
     */
    private static readonly ENTITY_MAPPINGS = new Map<string, EntityShaderVariableResolver>([
        [
            'Position',
            (e) => e.getComponent(Model).vertices
        ],
        [
            'Transform2D',
            (e) => e.getComponent(Transform2D).compute().float32Array
        ],
        [
            'Transform3D',
            (e) => e.getComponent(Transform3D).compute().float32Array
        ],
        [
            'Color',
            (e) => e.getComponent(FlatColor).color.float32Array
        ],
        [
            'VertexColor',
            (e) => e.getComponent(MultiColor).nextColor().float32Array
        ],
        [
            'TexCoord',
            (e) => e.getComponent(Model).textureCoordinates
        ]
    ]);

    /**
     * Retrieve an attribute or uniform value given by its name from some aribitrary Game data structure by executing the associated
     *   StaticShaderVariableResolver
     *
     * @param name the name of the attribute or uniform to retrieve a value for
     *
     * @returns the value of the attribute or uniform to build into vertex lists or upload as a uniform
     */
    public static resolveStaticVariable(name: string): Float32Array | number {
        const resolve = ShaderVariableResolver.STATIC_MAPPINGS.get(name.replace(/(a|u)_/, ''));

        if (!resolve) {
            throw new ProtoGLError({
                class: 'ShaderVariableResolver',
                method: 'resolveStaticVariable',
                message: `
                    Failed to retrieve value for shader variable name '${name}' : no resolver exists for this variable
                `
            });
        }

        return resolve();
    }

    /**
     * Retrieve an attribute or uniform value given by its name from the given Entity by executing the associated
     *   EntityShaderVariableResolver
     *
     * @param name the name of the attribute or uniform to retrieve a value for
     * @param entity the Entity to retrieve the value from
     *
     * @returns the value of the attribute or uniform to build into vertex lists or upload as a uniform
     */
    public static resolveEntityVariable(name: string, entity: Entity): Float32Array | number {
        const resolve = ShaderVariableResolver.ENTITY_MAPPINGS.get(name.replace(/(a|u)_/, ''));

        if (!resolve) {
            throw new ProtoGLError({
                class: 'ShaderVariableResolver',
                method: 'resolveEntityVariable',
                message: `
                    Failed to retrieve value for shader variable name '${name}' from Entity with tag '${entity.tag}' : no resolver exists
                    for this variable
                `
            });
        }

        return resolve(entity);
    }

    /**
     * Register a new Shader VariableResolver mapping for a given attribute/uniform variable name
     *
     * Facilitates system extension by way of allowing a consumer to define a resolution for an unknown shader variable name
     *
     * Separated from overrideVariableResolver() so as to avoid accidental consumer mistakes in changing built-in mappings
     *
     * @param variableName the name of the shader variable to register
     * @param variation the frequency of variable variation; per render call (static) or per Entity (entity). For Attributes, always Entity
     * @param resolve the VariableResolver which will retrieve the value for <variableName> at vertex compilation or render time
     */
    public static registerVariableResolver(variableName: string, variation: UniformVariation, resolve: VariableResolver): void {
        let mappings;

        switch (variation) {
            case UniformVariation.STATIC:
                mappings = ShaderVariableResolver.STATIC_MAPPINGS;
                break;

            case UniformVariation.ENTITY:
                mappings = ShaderVariableResolver.ENTITY_MAPPINGS;
                break;
        }

        if (mappings.get(variableName)) {
            throw new ProtoGLError({
                class: 'ShaderVariableResolver',
                method: 'registerVariableResolver',
                message: `
                   Failed to register shader variable resolver for variable name '${variableName}'; resolver already exists.
                    Override existing resolvers with 'overrideVariableResolver()'
                `
            });
        }

        mappings.set(variableName, resolve);
    }

    /**
     * Override an existing Shader VariableResolver mapping for a given attribute/uniform variable name
     *
     * Facilitates system extension by way of allowing a consumer to redefine a resolution for a known shader variable name
     *
     * Separated from registerVariableResolver() so as to avoid accidental consumer mistakes in changing built-in mappings
     *
     * @param variableName the name of the shader variable to override
     * @param variation the frequency of variable variation; per render call (static) or per Entity (entity). For Attributes, always Entity
     * @param resolve the VariableResolver which will retrieve the value for <variableName> at vertex compilation or render time
     */
    public static overrideVariableResolver(variableName: string, variation: UniformVariation, resolve: VariableResolver): void {
        let mappings;

        switch (variation) {
            case UniformVariation.STATIC:
                mappings = ShaderVariableResolver.STATIC_MAPPINGS;
                break;

            case UniformVariation.ENTITY:
                mappings = ShaderVariableResolver.ENTITY_MAPPINGS;
                break;
        }

        if (!mappings.get(variableName)) {
            // TODO we could just fall silently through to registration in this case; decide on this as well as the overall philosophy of
            //   separating overrides + additions
            throw new ProtoGLError({
                class: 'ShaderVariableResolver',
                method: 'overrideVariableResolver',
                message: `
                    Failed to override shader variable resolver for variable name '${variableName}'; resolver does not exist.
                    Register new resolvers with 'registerVariableResolver()'
                `
            });
        }

        mappings.set(variableName, resolve);
    }
}
