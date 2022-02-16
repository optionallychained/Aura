import { Transform2D } from '../../component/2d';
import { FlatColor, Model, Shader, Texture } from '../../component/generic';
import { Entity } from '../../entity';
import { BOX } from '../../geometry/2d';
import { Color, Vec2 } from '../../math';
import { PROGRAM_TEXTURE_COLORED_2D } from '../../shader/program/2d';

/**
 * Prefab Entity representing a character in 2D text, utilised by the Font manager
 */
export class Char2D extends Entity {

    constructor(position: Vec2, scale: Vec2, texCoords: Vec2, color: Color) {
        super({
            tag: 'font_char_2d',
            components: [
                new Transform2D(position, scale),
                new Shader(PROGRAM_TEXTURE_COLORED_2D),
                new Model(BOX),
                new Texture(texCoords.x, texCoords.y),
                new FlatColor(color)
            ]
        });
    }
}
