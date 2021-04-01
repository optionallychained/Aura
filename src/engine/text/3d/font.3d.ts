import { Entity } from '../../entity';
import { Color, Vec2, Vec3 } from '../../math';
import { Font } from '../font';
import { Char3D } from './char.3d';

export class Font3D extends Font {

    public addString(text: string, position: Vec3, scale: Vec3, color: Color): void {
        const entities: Array<Entity> = [];

        let i = 0;
        for (const char of text) {
            entities.push(new Char3D(
                Vec3.add(position, new Vec3(i * 0.25, 0, 0)),
                scale,
                new Vec2(this.config.charset.indexOf(char.toUpperCase()), 0),
                color
            ));

            i++;
        }

        this.addEntities(...entities);
    }
}
