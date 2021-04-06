import { Entity } from '../../entity';
import { Color, Vec2 } from '../../math';
import { Font } from '../font';
import { Char2D } from './char.2d';
import { Font2DConfig } from './font.2d.config';

/**
 * Concrete Font2D, a Font EntityManager setting out the 2D-specific properties and behavior of Font object management for 2D Games
 *
 * Implements and type-narrows the abstract elements of the parent class Font so as to produce consumer type-safety on things like String
 *   management
 */
export class Font2D extends Font<Font2DConfig> {

    /**
     * Concrete String addition routine, narrowing the generic types to ensure the correct configuration of a Font2D
     *
     * @param the text to render
     * @param position the Vec2 position of the panel
     * @param scale the Vec2 scale of the panel
     * @param color the Color of the panel
     */
    public addString(text: string, position: Vec2, scale: Vec2, color: Color): void {
        const entities: Array<Entity> = [];

        let i = 0;
        for (const char of text) {
            entities.push(new Char2D(
                Vec2.add(position, new Vec2(i * 0.25, 0)),
                scale,
                new Vec2(this.config.charset.indexOf(char.toUpperCase()), 0),
                color
            ));

            i++;
        }

        this.addEntities(...entities);
    }
}
