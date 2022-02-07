import { Angle, Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

export class Shape extends Entity.Entity {

    constructor(geometry: Geometry.Geometry, position = new Vec2(), scale = 10) {
        const r = Math.random() < 0.5;

        const components: Array<Component.Component> = [
            new Component.TwoD.Transform2D(position, new Vec2(scale, scale)),
            new Component.Generic.Model(geometry),
        ];

        if (r) {
            components.push(new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D));
            components.push(new Component.Generic.FlatColor(Color.random()));
        }
        else {
            components.push(new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_COLOR_PER_VERTEX_2D));
            components.push(new Component.Generic.MultiColor(Color.randomList(30)));
        }

        super({
            tag: 'shape',
            components
        });
    }

    public tick(): void {
        this.getComponent<Component.TwoD.Transform2D>('Transform2D').rotate(Angle.toRadians(1));
    }
}
