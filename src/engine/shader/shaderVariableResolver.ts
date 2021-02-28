import { FlatColor, Model, MultiColor } from '../component';
import { Transform2D } from '../component/2d';
import { Transform3D } from '../component/3d';
import { ProtoGLError } from '../core';
import { Entity } from '../entity/entity'
import { EntityShaderVariableResolver } from './entityShaderVariableResolver.type';

/**
 * Utility class for automatically retrieving attribute and uniform shader values from Entities and their Components
 *
 * Sets out the system's default mappings of standardised attribute/uniform names to defined Component properties
 *
 * Allows for the registration of new mappings at application runtime, facilitating system extension by way of custom shaders and components
 *
 * Handles errors in the absence of shader values
 */
export class ShaderVariableResolver {

    /**
     * The internal map of Shader Variable Name => Resolution function
     */
    private static readonly MAPPINGS = new Map<string, EntityShaderVariableResolver>([
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
        ]
    ]);

    /**
     * Retrieve an attribute or uniform value given by its name from the given Entity by executing the associated EntityShaderResolver
     *
     * @param name the name of the attribute or uniform to retrieve a value for
     * @param entity the Entity to retrieve the value from
     *
     * @returns the value of the attribute or uniform to build into vertex lists or pipe to the GPU for draw calls
     */
    public static resolveShaderVariableForEntity(name: string, entity: Entity): Float32Array | number {
        const resolve = ShaderVariableResolver.MAPPINGS.get(name.replace(/(a|u)_/, ''));

        if (!resolve) {
            throw new ProtoGLError({
                class: 'ShaderVariableResolver',
                method: 'resolveShaderVariableForEntity',
                message: `
                    Failed to retrieve value for shader variable name '${name}' from Entity with tag '${entity.tag}' : no resolver exists
                    for this variable
                `
            });
        }

        return resolve(entity);
    }

    /**
     * Register a new Entity Shader value resolution mapping for a given Shader attribute/uniform variable name
     *
     * Facilitates system extension by way of allowing a consumer to define a resolution for a custom shader variable name and/or a custom
     *   Component
     *
     * Separated from overrideEntityShaderResolver() so as to avoid accidental consumer mistakes in changing built-in mappings
     *
     * @param variableName the name of the shader variable to register
     * @param resolve the EntityShaderResolver which will retrieve the relevant value from the Entity
     */
    public static registerEntityShaderResolver(variableName: string, resolve: EntityShaderVariableResolver): void {
        if (ShaderVariableResolver.MAPPINGS.get(variableName)) {
            throw new ProtoGLError({
                class: 'ShaderVariableResolver',
                method: 'registerEntityShaderResolver',
                message: `
                    Failed to register value resolver for shader variable name '${variableName}'; resolver already exists.
                    If this is an intentional override, use 'overrideEntityShaderResolver().
                `
            });
        }

        ShaderVariableResolver.MAPPINGS.set(variableName, resolve);
    }

    /**
     * Override an existing Entity Shader value resolution mapping for a given Shader attribute/uniform variable name
     *
     * Facilitates system extension by way of allowing a consumer to redefine a resolution for a built-in shader variable name and/or a
     *   built-in Component
     *
     * Separated from registerEntityShaderResolver() so as to avoid accidental consumer mistakes in changing built-in mappings
     *
     * @param variableName the name of the shader variable to override
     * @param resolve the EntityShaderResolver which will retrieve the relevant value from the Entity
     */
    public static overrideEntityShaderResolver(variableName: string, resolve: EntityShaderVariableResolver): void {
        if (!ShaderVariableResolver.MAPPINGS.get(variableName)) {
            // TODO we could just fall silently through to registration in this case; decide on this as well as the overall philosophy of
            //   separating overrides + additions
            throw new ProtoGLError({
                class: 'ShaderVariableResolver',
                method: 'overrideEntityShaderResolver',
                message: `
                    Failed to override value resolver for shader variable name '${variableName}'; resolver does not exist.
                    Register new resolvers with 'registerEntityShaderResolver()'
                `
            });
        }

        ShaderVariableResolver.MAPPINGS.set(variableName, resolve);
    }
}
