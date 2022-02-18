import { Entity } from '../../entity/entity';
import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { Vec3 } from '../../math/vec3';
import { TextManager } from '../text.manager';
import { Char3D } from './char';
import { TextConfig } from './text.config';

/**
 * Concrete 3D Text, a TextManager setting out 3D-specific properties and behavior, providing type safety for Aura3D
 */
export class Text extends TextManager<TextConfig> {

    /**
     * Add a 3D string to display
     *
     * @param string the string to add
     * @param position the 3D position of the string to add
     * @param scale the 3D scale of the string to add
     * @param color the Color of the string to add
     */
    public addString(text: string, position: Vec3, scale: Vec3, color: Color): void {
        const entities: Array<Entity> = [];

        let i = 0;
        for (const char of text) {
            entities.push(new Char3D(
                Vec3.add(position, new Vec3(i * scale.x, 0, 0)),
                scale,
                new Vec2(this.config.charset.indexOf(char.toUpperCase()), 0),
                color
            ));

            i++;
        }

        this.addEntities(...entities);
    }
}
