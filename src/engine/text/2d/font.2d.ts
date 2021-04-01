import { Entity } from '../../entity';
import { Color, Vec2 } from '../../math';
import { Font } from '../font';
import { Char2D } from './char.2d';

export class Font2D extends Font {

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
