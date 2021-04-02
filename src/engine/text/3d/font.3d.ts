import { Entity } from '../../entity';
import { Color, Vec2, Vec3 } from '../../math';
import { Font } from '../font';
import { FontConfig3D } from '../font.config';
import { Char3D } from './char.3d';

/**
 * Concrete Font3D, a Font EntityManager setting out the 3D-specific properties and behavior of Font object management for 3D Games
 *
 * Implements and type-narrows the abstract elements of the parent class Font so as to produce consumer type-safety on things like String
 *   management
 */
export class Font3D extends Font<FontConfig3D> {

    /**
     * Concrete String addition routine, narrowing the generic types to ensure the correct configuration of a Font3D
     *
     * @param the text to render
     * @param position the Vec3 position of the panel
     * @param scale the Vec3 scale of the panel
     * @param color the Color of the panel
     */
    public addString(text: string, position: Vec3, scale: Vec3, color: Color): void {
        const entities: Array<Entity> = [];

        let i = 0;
        for (const char of text) {
            entities.push(new Char3D(
                Vec3.add(position, new Vec3(i * 0.25, 0, 0)),
                scale,
                new Vec2(this.config.charset.indexOf(char.toUpperCase()), 0),
                color
            ));

            i++;
        }

        this.addEntities(...entities);
    }
}
