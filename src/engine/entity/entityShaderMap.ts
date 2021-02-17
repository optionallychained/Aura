import { FlatColor, Model, Transform } from '../component';
import { UniformType } from '../shader/uniformType';
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
    public static VARIABLE_NAMES = [
        'Position',
        'Transform',
        'Color'
    ];

    // TODO readonly?
    private static MAP = new Map<string, (e: Entity) => Float32Array | number>([
        [
            // TODO this does not solve the problem of Entity attributes; it's just a quick placeholder for current requirement of only vertices
            'Position',
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

    public static getAttributeValueForEntity(name: string, entity: Entity): Array<number> | number {
        const variableName = name.replace(/(a|u)_/, '');

        const value = EntityShaderMap.MAP.get(variableName)?.(entity);

        if (!value) {
            throw Error('Could not resolve attribute value for Entity');
        }

        // TODO dumb quick solution to a dumb problem
        // super dumb
        if (value instanceof Float32Array) {
            return Array.from(value);
        }

        return value;
    }

    // TODO error handling
    public static getShaderValueForEntity(name: string, entity: Entity): { type: UniformType, value: Float32Array | number } {
        const variableName = name.replace(/(a|u)_/, '');

        const value = EntityShaderMap.MAP.get(variableName)?.(entity);

        if (!value) {
            throw Error('Could not resolve Shader value for Entity');
        }

        return {
            type: EntityShaderMap.resolveTypeForValue(value),
            value
        };
    }

    // TODO
    public static registerEntityShaderMapping(name: string, resolve: (e: Entity) => Float32Array | number): void {
        EntityShaderMap.MAP.set(name, resolve);
        EntityShaderMap.VARIABLE_NAMES.push(name);
    }

    private static resolveTypeForValue(value: Float32Array | number): UniformType {
        if (typeof value === 'number') {
            return UniformType.NUMBER;
        }
        else {
            switch (value.length) {
                case 2:
                    return UniformType.VEC2;

                case 3:
                    return UniformType.VEC3;

                case 4:
                    return UniformType.VEC4;

                case 9:
                    return UniformType.MAT3;

                case 16:
                    return UniformType.MAT4;
            }
        }

        throw Error('Invalid uniform type');
    }
}
