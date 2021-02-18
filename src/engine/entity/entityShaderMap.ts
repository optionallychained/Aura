import { FlatColor, Model, Transform } from '../component';
import { Entity } from './entity'
import { EntityShaderResolver } from './entityShaderResolver.type';

/**
 * Utility class for automatically retrieving attribute and uniform shader values from Entities and their Components
 *
 * Sets out the system's default mappings of standardised attribute/uniform names to defined Component properties
 *
 * Allows for the registration of new mappings at application runtime
 *
 * Handles errors in the absence of shader values
 */
export class EntityShaderMap {

    // TODO temporary
    /* eslint-disable max-len */

    // TODO readonly?
    private static MAP = new Map<string, EntityShaderResolver>([
        [
            'Position',
            // TODO dumb and for now not considering actual Transform.position
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

    // TODO error handling
    public static getShaderValueForEntity(name: string, entity: Entity): Float32Array | number {
        const variableName = name.replace(/(a|u)_/, '');

        const value = EntityShaderMap.MAP.get(variableName)?.(entity);

        if (!value) {
            throw Error('Could not resolve Shader value for Entity');
        }

        return value;
    }

    // register a NEW shader mapping. Separated from overriding existing ones for clear user API and error handling avoiding accidental alteration of built-in functionality
    // in effect, force the user to be explicit when wanting to override internal functionality
    public static registerEntityShaderMapping(variableName: string, resolve: EntityShaderResolver): void {
        if (EntityShaderMap.MAP.get(variableName)) {
            throw Error(`Entity Shader Mapping for ${variableName} already exists; this may be an accidental override; if not, please use 'overrideEntityShaderMapping()'`);
        }

        EntityShaderMap.MAP.set(variableName, resolve);
    }

    public static overrideEntityShaderMapping(variableName: string, resolve: EntityShaderResolver): void {
        if (!EntityShaderMap.MAP.get(variableName)) {
            // TODO do we want to error in this case? Could safely pass through to registration silently...better to ensure the user knows the use-case maybe?
            throw Error(`Entity Shader Mapping for ${variableName} does not exist; use 'registerEntityShaderMapping()' instead`);
        }

        EntityShaderMap.MAP.set(variableName, resolve);
    }
}
