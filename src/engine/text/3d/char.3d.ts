import { FlatColor, Model, Shader, Texture } from '../../component';
import { Transform3D } from '../../component/3d';
import { Game } from '../../core';
import { Entity } from '../../entity';
import { BOX } from '../../geometry/3d';
import { Color, Vec2, Vec3 } from '../../math';
import { PROGRAM_TEXTURE_COLORED_3D } from '../../shader/program/3d';

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

    public tick(game: Game, frameDelta: number): void { }
}
