import { FlatColor, Model, Transform } from '../component';
import { Entity } from './entity'

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

    // TODO readonly?
    private static VARIABLE_NAMES = [
        'Position',
        'Transform',
        'Color'
    ];

    // TODO readonly?
    private static MAP = new Map<string, (e: Entity) => Float32Array | number>([
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

    // TODO
    public static registerEntityShaderMapping(name: string, resolve: (e: Entity) => Float32Array | number): void {
        EntityShaderMap.MAP.set(name, resolve);
        EntityShaderMap.VARIABLE_NAMES.push(name);
    }
}
