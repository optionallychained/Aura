import { Transform } from '../../component/3d/transform.component';
import { FlatColor } from '../../component/generic/flatColor.component';
import { Model } from '../../component/generic/model.component';
import { Shader } from '../../component/generic/shader.component';
import { Texture } from '../../component/generic/texture.component';
import { Entity } from '../../entity/entity';
import { CUBE } from '../../geometry/3d/cube.geometry';
import { Color } from '../../math/color';
import { Vec2 } from '../../math/vec2';
import { Vec3 } from '../../math/vec3';
import { PROGRAM_TEXTURE_COLORED } from '../../shader/program/3d/textureColored.program';

/**
 * Prefab Entity representing a character in 3D text, utilised by the 3D TextManager
 */
export class Char3D extends Entity {

    /**
     * Constructor. Configure a basic Entity representing a 3D Character
     *
     * @param position the 3D position of the Char
     * @param scale the 3D scale of the Char
     * @param texCoords the sampling coordinates of the Char within the Text Atlas
     * @param color the Color of the Char
     */
    constructor(position: Vec3, scale: Vec3, texCoords: Vec2, color: Color) {
        super({
            tag: 'char',
            components: [
                new Transform(position, scale),
                new Shader(PROGRAM_TEXTURE_COLORED),
                new Model(CUBE),
                new Texture(texCoords.x, texCoords.y),
                new FlatColor(color)
            ]
        });
    }
}
