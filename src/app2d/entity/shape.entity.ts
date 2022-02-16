import { Transform2D } from '../../aura/component/2d/transform.component.2d';
import { Component } from '../../aura/component/component';
import { FlatColor } from '../../aura/component/generic/flatColor.component';
import { Model } from '../../aura/component/generic/model.component';
import { MultiColor } from '../../aura/component/generic/multiColor.component';
import { Shader } from '../../aura/component/generic/shader.component';
import { Entity } from '../../aura/entity/entity';
import { Geometry } from '../../aura/geometry/geometry';
import { Angle } from '../../aura/math/angle';
import { Color } from '../../aura/math/color';
import { Vec2 } from '../../aura/math/vec2';
import { PROGRAM_BASIC_2D } from '../../aura/shader/program/2d/basic.program.2d';
import { PROGRAM_COLOR_PER_VERTEX_2D } from '../../aura/shader/program/2d/colorPerVertex.program.2d';

export class Shape extends Entity {

    constructor(geometry: Geometry, position = new Vec2(), scale = 10) {
        const r = Math.random() < 0.5;

        const components: Array<Component> = [
            new Transform2D(position, new Vec2(scale, scale)),
            new Model(geometry),
        ];

        if (r) {
            components.push(new Shader(PROGRAM_BASIC_2D));
            components.push(new FlatColor(Color.random()));
        }
        else {
            components.push(new Shader(PROGRAM_COLOR_PER_VERTEX_2D));
            components.push(new MultiColor(Color.randomList(30)));
        }

        super({
            tag: 'shape',
            components
        });
    }

    public tick(): void {
        this.getComponent<Transform2D>('Transform2D').rotate(Angle.toRadians(1));
    }
}
