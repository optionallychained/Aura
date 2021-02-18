import { FlatColor, Model, Transform } from '../component';
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
            // TODO dumb and for now not considering actual Transform.position
            //   improve alongside work to map Entity positions from world->screenspace
            (e) => Float32Array.from(e.getComponent<Model>('Model')!.vertices.map((v) => v.array).reduce((prev, current) => prev.concat(current)))
        ],
        [
            'Transform',
            (e) => e.getComponent<Transform>('Transform')!.transform.float32Array
        ],
        [
            'Color',
            (e) => e.getComponent<FlatColor>('FlatColor')!.color.float32Array
        ]
    ]);

    /**
     * Retrieve an attribute or uniform value given by its name from the given Entity by executing the associated EntityShaderResolver
     *
     * // TODO error handling
     *
     * @param name the name of the attribute or uniform to retrieve a value for
     * @param entity the Entity to retrieve the value from
     *
     * @returns the value of the attribute or uniform to build into vertex lists or pipe to the GPU for draw calls
     */
    public static getShaderValueForEntity(name: string, entity: Entity): Float32Array | number {
        const variableName = name.replace(/(a|u)_/, '');

        const value = EntityShaderMap.MAP.get(variableName)?.(entity);

        if (!value) {
            throw Error('Could not resolve Shader value for Entity');
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
            throw Error(`Entity Shader Mapping for ${variableName} already exists; this may be an accidental override; if not, please use 'overrideEntityShaderMapping()'`);
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
            throw Error(`Entity Shader Mapping for ${variableName} does not exist; use 'registerEntityShaderMapping()' instead`);
        }

        EntityShaderMap.MAP.set(variableName, resolve);
    }
}
