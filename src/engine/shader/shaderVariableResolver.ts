import { FlatColor, Model, MultiColor } from '../component';
import { Transform2D } from '../component/2d';
import { Transform3D } from '../component/3d';
import { Game, AuraError } from '../core';
import { Entity } from '../entity';
import { Mat4 } from '../math';

/**
 * Internal-use utility type representing a Shader Variable Resolution Function which retrieves a value from the Game
 */
type StaticShaderVariableResolver = (game: Game) => Float32Array | number;

/**
 * Internal-use utility type representing a Shader Variable Resolution Function which retrieves a value from an Entity
 */
type EntityShaderVariableResolver = (e: Entity) => Float32Array | number;


/**
 * Utility class for automatically retrieving attribute and uniform shader values from Entities, Components and other Game constructs
 *
 * Forms a critical component of the system's rendering approach, where Entities are able to specify their own Shaders. Utilised by the
 *   EntityManager in the construction of Vertex Buffers, and by the WebGLRenderer in the upload of Uniforms
 *
 * Works in conjunction with VertexShader + FragmentShader configuration objects, which specify the names, sizes, types, and variation
 *   patterns of their attributes and uniforms
 *
 * Mappings of <shaderVariableName => ResolutionFunction> are broken into three categories - Attribute, EntityUniform and StaticUniform:
 *   - Attribute - attributes, varying per vertex, to be retrieved from Entities in the construction of Vertex Buffers by the EntityManager
 *     - example: `attribute vec2 a_Position;` - a vertex position, retrieved from an Entity's Model Component
 *
 *   - EntityUniform - uniforms, varying per Entity, to be retrieved from Entities and uploaded once per draw call by the WebGLRenderer
 *     - example: `uniform mat3 u_Transform2D;` - an Entity's Transformation Matrix, retrieved from its Transform Component
 *
 *   - StaticUniform - uniforms, unrelated to Entities, to be retrieved from the Game and uploaded once per render call by the WebGLRenderer
 *     - example: `uniform mat3 u_View2D;` - the 2D View Matrix, retrieved from the Game's World/Camera
 *
 * The mappings built into the class represent the supported set of built-in Attribute/Uniform names which, when used in Shaders, will
 *   automatically be retrieved; thereby also setting out the relationship between a variable name and the Entity/engine data it reflects
 *
 * Allows for the registration of new mappings at application initialisation, facilitating the extension of the system's built-in Shader and
 *   Component library
 *
 * Allows for the overriding of built-in mappings as an explicit choice separate from registration; supporting the augmentation of default
 *   engine functionality but avoiding user error
 *
 * Handles errors in the absence of Resulution Functions for given names, preventing invalid WebGL draws
 *
 * // TODO the information in this class *could* be used to 'verify' an Entity's makeup - that it can be rendered with its designated Shader
 *
 * @see EntityShaderVariableResolver
 * @see StaticShaderVariableResolver
 * @see VertexShader
 * @see FragmentShader
 * @see EntityManager
 * @see WebGLRenderer
 */
export class ShaderVariableResolver {

    /**
     * Mappings supporting the automatic resolution of Attributes from Entity Components
     */
    private static readonly ENTITY_ATTRIBUTE_MAPPINGS = new Map<string, EntityShaderVariableResolver>([
        [
            'a_Position',
            (e) => e.getComponent(Model).vertices
        ],
        [
            'a_Color',
            (e) => e.getComponent(FlatColor).color.float32Array
        ],
        [
            'a_VertexColor',
            (e) => e.getComponent(MultiColor).nextColor().float32Array
        ],
        [
            'a_TexCoord',
            (e) => e.getComponent(Model).textureCoordinates
        ]
    ]);

    /**
     * Mappings supporting the automatic resolution of draw-call Uniforms from Entity Components
     */
    private static readonly ENTITY_UNIFORM_MAPPINGS = new Map<string, EntityShaderVariableResolver>([
        [
            'u_Transform2D',
            (e) => e.getComponent(Transform2D).compute().float32Array
        ],
        [
            'u_Transform3D',
            (e) => e.getComponent(Transform3D).compute().float32Array
        ],
        [
            'u_Color',
            (e) => e.getComponent(FlatColor).color.float32Array
        ]
    ]);

    /**
     * Mappings supporting the automatic resolution of render-call Uniforms from Game constructs
     */
    private static readonly STATIC_UNIFORM_MAPPINGS = new Map<string, StaticShaderVariableResolver>([
        [
            'u_Projection',
            (game) => game.renderer.projection.float32Array
        ],
        [
            'u_Perspective',
            (game) => game.renderer.perspective.float32Array
        ],
        [
            'u_Ortho',
            (game) => game.renderer.ortho.float32Array
        ],
        [
            'u_View2D',
            (game) => game.world.getCamera2D().getViewMatrix().float32Array
        ],
        [
            'u_View3D',
            (game) => game.world.getCamera3D().getViewMatrix().float32Array
        ],
        [
            'u_Texture',
            (game) => game.renderer.activeTextureUnit
        ]
    ]);

    /**
     * Resolve an Attribute value, given its name, from an Entity
     *
     * @param attributeName the name of the attribute to resolve a value for
     * @param entity the Entity to retrieve the value from
     *
     * @returns the resolved Attribute value
     */
    public static resolveAttribute(attributeName: string, entity: Entity): Float32Array | number {
        const resolve = ShaderVariableResolver.ENTITY_ATTRIBUTE_MAPPINGS.get(attributeName);

        if (!resolve) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'resolveAttribute',
                message: `
                    Failed to retrieve value for attribute name '${attributeName}' : no resolution function exists for this variable
                `
            });
        }

        return resolve(entity);
    }

    /**
     * Resolve a Uniform value, given its name, from an Entity
     *
     * @param uniformName the name of the uniform to resolve a value for
     * @param entity the Entity to retrieve the value from
     *
     * @returns the resolved Uniform value
     */
    public static resolveEntityUniform(uniformName: string, entity: Entity): Float32Array | number {
        const resolve = ShaderVariableResolver.ENTITY_UNIFORM_MAPPINGS.get(uniformName);

        if (!resolve) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'resolveEntityUniform',
                message: `
                    Failed to retrieve value for uniform name '${uniformName}' : no resolution function exists for this variable
                `
            });
        }

        return resolve(entity);
    }

    /**
     * Resolve a Uniform value, given its name, from the Game
     *
     * @param uniformName the name of the uniform to resolve a value for
     * @param game the Game instance to retrieve the value from
     *
     * @returns the resolved Uniform value
     */
    public static resolveStaticUniform(uniformName: string, game: Game): Float32Array | number {
        const resolve = ShaderVariableResolver.STATIC_UNIFORM_MAPPINGS.get(uniformName);

        if (!resolve) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'resolveStaticUniform',
                message: `
                    Failed to retrieve value for uniform name '${uniformName}' : no resolution function exists for this variable
                `
            });
        }

        return resolve(game);
    }

    /**
     * Register a new resolution function for a given unknown Shader Attribute name
     *
     * @param attributeName the name of the Attribute to register
     * @param resolve the resolution function to register
     */
    public static registerAttributeResolver(attributeName: string, resolve: EntityShaderVariableResolver): void {
        const existing = ShaderVariableResolver.ENTITY_ATTRIBUTE_MAPPINGS.get(attributeName);

        if (existing) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'registerAttributeResolver',
                message: `
                    Failed to register resolution function for attribute name '${attributeName}' : this variable is already registered.
                    Override existing resolution functions with 'overrideAttributeResolver()'
                `
            });
        }

        ShaderVariableResolver.ENTITY_ATTRIBUTE_MAPPINGS.set(attributeName, resolve);
    }

    /**
     * Register a new resolution function for a given unknown Shader Uniform name, where that Uniform varies per Entity
     *
     * @param uniformName the name of the Uniform to register
     * @param resolve the resolution function to register
     */
    public static registerEntityUniformResolver(uniformName: string, resolve: EntityShaderVariableResolver): void {
        const existing = ShaderVariableResolver.ENTITY_UNIFORM_MAPPINGS.get(uniformName);

        if (existing) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'registerEntityUniformResolver',
                message: `
                    Failed to register entity resolution function for uniform name '${uniformName}' : this variable is already registered.
                    Override existing resolution functions with 'overrideEntityUniformResolver()'
                `
            });
        }

        ShaderVariableResolver.ENTITY_UNIFORM_MAPPINGS.set(uniformName, resolve);
    }

    /**
     * Register a new resolution function for a given unknown Shader Uniform name, where that Uniform is unassocated with any given Entity
     *
     * @param uniformName the name of the Uniform to register
     * @param resolve the resolution function to register
     */
    public static registerStaticUniformResolver(uniformName: string, resolve: StaticShaderVariableResolver): void {
        const existing = ShaderVariableResolver.STATIC_UNIFORM_MAPPINGS.get(uniformName);

        if (existing) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'registerStaticUniformResolver',
                message: `
                    Failed to register static resolution function for uniform name '${uniformName}' : this variable is already registered.
                    Override existing resolution functions with 'overrideStaticUniformResolver()'
                `
            });
        }

        ShaderVariableResolver.STATIC_UNIFORM_MAPPINGS.set(uniformName, resolve);
    }

    /**
     * Override an existing resolution function for a given known Shader Attribute name
     *
     * @param attributeName the name of the Attribute to override
     * @param resolve the replacement resolution function
     */
    public static overrideAttributeResolver(attributeName: string, resolve: EntityShaderVariableResolver): void {
        const existing = ShaderVariableResolver.ENTITY_ATTRIBUTE_MAPPINGS.get(attributeName);

        if (!existing) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'overrideAttributeResolver',
                message: `
                    Failed to override resolution function for attribute name '${attributeName}' : this variable is not already registered.
                    Add new resolution functions with 'registerAttributeResolver()'
                `
            });
        }

        ShaderVariableResolver.ENTITY_ATTRIBUTE_MAPPINGS.set(attributeName, resolve);
    }

    /**
     * Override an existing resolution function for a given known Shader Uniform name, where that Uniform varies per Entity
     *
     * @param uniformName the name of the Uniform to override
     * @param resolve the replacement resolution function
     */
    public static overrideEntityUniformResolver(uniformName: string, resolve: EntityShaderVariableResolver): void {
        const existing = ShaderVariableResolver.ENTITY_UNIFORM_MAPPINGS.get(uniformName);

        if (!existing) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'overrideEntityUniformResolver',
                message: `
                    Failed to override entity resolution function for uniform name '${uniformName}' : this variable is not already
                    registered.
                    Add new resolution functions with 'registerEntityUniformResolver()'
                `
            });
        }

        ShaderVariableResolver.ENTITY_UNIFORM_MAPPINGS.set(uniformName, resolve);
    }

    /**
     * Override an existing resolution function for a given known Shader Uniform name, where that Uniform is unassocated with any given
     *   Entity
     *
     * @param uniformName the name of the Uniform to override
     * @param resolve the replacement resolution function
     */
    public static overrideStaticUniformResolver(uniformName: string, resolve: StaticShaderVariableResolver): void {
        const existing = ShaderVariableResolver.STATIC_UNIFORM_MAPPINGS.get(uniformName);

        if (!existing) {
            throw new AuraError({
                class: 'ShaderVariableResolver',
                method: 'overrideStaticUniformResolver',
                message: `
                    Failed to override static resolution function for uniform name '${uniformName}' : this variable is not already
                    registered.
                    Add new resolution functions with 'registerStaticUniformResolver()'
                `
            });
        }

        ShaderVariableResolver.STATIC_UNIFORM_MAPPINGS.set(uniformName, resolve);
    }
}
