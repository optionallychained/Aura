import { Transform } from '../../component/2d/transform.component';
import { FlatColor } from '../../component/generic/flatColor.component';
import { Model } from '../../component/generic/model.component';
import { Shader } from '../../component/generic/shader.component';
import { Texture } from '../../component/generic/texture.component';
import { Entity } from '../../entity/entity';
import { SQUARE } from '../../geometry/2d/square.geometry';
import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { PROGRAM_TEXTURE_COLORED } from '../../shader/program/2d/textureColored.program';

/**
 * Prefab Entity representing a character in 2D text, utilised by the 2D TextManager
 */
export class Char extends Entity {

    /**
     * Constructor. Configure a basic Entity representing a 2D Character
     *
     * @param position the 2D position of the Char
     * @param scale the 2D scale of the Char
     * @param texCoords the sampling coordinates of the Char within the Text Atlas
     * @param color the Color of the Char
     */
    constructor(position: Vec2, scale: Vec2, texCoords: Vec2, color: Color) {
        super({
            tag: 'char',
            components: [
                new Transform(position, scale),
                new Shader(PROGRAM_TEXTURE_COLORED),
                new Model(SQUARE),
                new Texture(texCoords.x, texCoords.y),
                new FlatColor(color)
            ]
        });
    }
}
