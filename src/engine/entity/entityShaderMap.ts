import { FlatColor, Model, MultiColor, Transform } from '../component';
import { Entity } from './entity'
import { EntityShaderResolver } from './entityShaderResolver.type';

/**
 * Utility class for automatically retrieving attribute and uniform shader values from Entities and their Components
 *
 * Sets out the system's default mappings of standardised attribute/uniform names to defined Component properties
 *
 * Allows for the registration of new mappings at application runtime, facilitating system extension by way of custom shaders and components
 *
 * Handles errors in the absence of shader values
 */
export class EntityShaderMap {

    // TODO temporary ?
    /* eslint-disable max-len */

    /**
     * The internal map of Shader Variable Name => Resolution function
     */
    private static MAP = new Map<string, EntityShaderResolver>([
        [
            'Position',
            (e) => e.getComponent<Model>('Model').vertices
        ],
        [
            'Transform',
            (e) => e.getComponent<Transform>('Transform').compute().float32Array
        ],
        [
            'Color',
            (e) => e.getComponent<FlatColor>('FlatColor').color.float32Array
        ],
        [
            'VertexColor',
            (e) => e.getComponent<MultiColor>('MultiColor').nextColor().float32Array
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
    public static getShaderValueForEntity(name: string, entity: Entity): Float32Array | number {
        const resolve = EntityShaderMap.MAP.get(name.replace(/(a|u)_/, ''));

        if (!resolve) {
            throw Error(`No shader value resolver for variable name ${name}`);
        }

        const value = resolve(entity);

        if (!value) {
            throw Error(`Could not get shader value for variable ${name} for Entity with tag ${entity.tag} and id ${entity.id}`);
        }

        return value;
    }

    /**
     * Register a new Entity Shader value resolution mapping for a given Shader attribute/uniform variable name
     *
     * Facilitates system extension by way of allowing a consumer to define a resolution for a custom shader variable name and/or a custom
     *   Component
     *
     * Separated from overrideEntityShaderMapping() so as to avoid accidental consumer mistakes in changing built-in mappings
     *
     * @param variableName the name of the shader variable to register
     * @param resolve the EntityShaderResolver which will retrieve the relevant value from the Entity
     */
    public static registerEntityShaderMapping(variableName: string, resolve: EntityShaderResolver): void {
        if (EntityShaderMap.MAP.get(variableName)) {
            throw Error(
                `Entity Shader Mapping for variable name ${variableName} already exists.
                If this is an intentional override, use 'overrideEntityShaderMapping()'`
            );
        }

        EntityShaderMap.MAP.set(variableName, resolve);
    }

    /**
     * Override an existing Entity Shader value resolution mapping for a given Shader attribute/uniform variable name
     *
     * Facilitates system extension by way of allowing a consumer to redefine a resolution for a built-in shader variable name and/or a
     *   built-in Component
     *
     * Separated from registerEntityShaderMapping() so as to avoid accidental consumer mistakes in changing built-in mappings
     *
     * @param variableName the name of the shader variable to override
     * @param resolve the EntityShaderResolver which will retrieve the relevant value from the Entity
     */
    public static overrideEntityShaderMapping(variableName: string, resolve: EntityShaderResolver): void {
        if (!EntityShaderMap.MAP.get(variableName)) {
            // TODO we could just fall silently through to registration in this case; decide on this as well as the overall philosophy of
            //   separating overrides + additions
            throw Error(
                `Entity Shader Mapping for variable name ${variableName} does not exist.
                Register a new mapping with 'registerEntityShaderMapping()'`
            );
        }

        EntityShaderMap.MAP.set(variableName, resolve);
    }
}
