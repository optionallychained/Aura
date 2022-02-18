import { Entity } from '../../entity/entity';
import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { TextManager } from '../text.manager';
import { Char } from './char';
import { TextConfig } from './text.config';

/**
 * Concrete 2D Text, a TextManager setting out 2D-specific properties and behavior, providing type safety for Aura2D
 */
export class Text extends TextManager<TextConfig> {

    /**
     * Add a 2D string to display
     *
     * @param string the string to add
     * @param position the 2D position of the string to add
     * @param scale the 2D scale of the string to add
     * @param color the Color of the string to add
     */
    public addString(text: string, position: Vec2, scale: Vec2, color: Color): void {
        const entities: Array<Entity> = [];

        let i = 0;
        for (const char of text) {
            entities.push(new Char(
                Vec2.add(position, new Vec2(i * scale.x, 0)),
                scale,
                new Vec2(this.config.charset.indexOf(char.toUpperCase()), 0),
                color
            ));

            i++;
        }

        this.addEntities(...entities);
    }
}
