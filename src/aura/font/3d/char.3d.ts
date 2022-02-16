import { Transform3D } from '../../component/3d/transform.component.3d';
import { FlatColor } from '../../component/generic/flatColor.component';
import { Model } from '../../component/generic/model.component';
import { Shader } from '../../component/generic/shader.component';
import { Texture } from '../../component/generic/texture.component';
import { Entity } from '../../entity/entity';
import { BOX } from '../../geometry/3d/box.geometry.3d';
import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { Vec3 } from '../../math/vec3';
import { PROGRAM_TEXTURE_COLORED_3D } from '../../shader/program/3d/textureColored.program.3d';

/**
 * Prefab Entity representing a character in 3D text, utilised by the Font manager
 */
export class Char3D extends Entity {

    constructor(position: Vec3, scale: Vec3, texCoords: Vec2, color: Color) {
        super({
            tag: 'font_char_3d',
            components: [
                new Transform3D(position, scale),
                new Shader(PROGRAM_TEXTURE_COLORED_3D),
                new Model(BOX),
                new Texture(texCoords.x, texCoords.y),
                new FlatColor(color)
            ]
        });
    }
}
