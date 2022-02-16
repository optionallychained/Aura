import { Transform2D } from '../../component/2d/transform.component.2d';
import { FlatColor } from '../../component/generic/flatColor.component';
import { Model } from '../../component/generic/model.component';
import { Shader } from '../../component/generic/shader.component';
import { Texture } from '../../component/generic/texture.component';
import { Entity } from '../../entity/entity';
import { SQUARE } from '../../geometry/2d/square.geometry.2d';
import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { PROGRAM_TEXTURE_COLORED_2D } from '../../shader/program/2d/textureColored.program.2d';

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
                new Model(SQUARE),
                new Texture(texCoords.x, texCoords.y),
                new FlatColor(color)
            ]
        });
    }
}
