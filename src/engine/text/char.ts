import { FlatColor, Model, Shader, Texture } from '../component';
import { Transform2D } from '../component/2d';
import { Entity } from '../entity';
import { BOX } from '../geometry/2d';
import { Color, Vec2 } from '../math';
import { PROGRAM_TEXTURE_COLORED_2D } from '../shader/program/2d';

export class Char extends Entity {

    constructor(position: Vec2, scale: Vec2, texCoords: Vec2, color: Color) {
        super({
            tag: 'string_char',
            components: [
                new Transform2D(position, scale),
                new Shader(PROGRAM_TEXTURE_COLORED_2D),
                new Model(BOX),
                new Texture(texCoords.x, texCoords.y),
                new FlatColor(color)
            ]
        });
    }

    public tick(frameDelta: number): void { }
}
