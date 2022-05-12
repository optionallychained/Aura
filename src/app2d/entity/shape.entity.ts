import { Angle, Color, Component, Entity, FlatColor, Geometry, Model, MultiColor, Shader, ShaderPrograms, Transform, Vec2 } from '../../aura/aura.2d';

export class Shape extends Entity {

    constructor(geometry: Geometry, position = new Vec2(), scale = 10) {
        const r = Math.random() < 0.5;

        const components: Array<Component> = [
            new Transform(position, new Vec2(scale, scale)),
            new Model(geometry)
        ];

        if (r) {
            components.push(new Shader(ShaderPrograms.BASIC));
            components.push(new FlatColor(Color.random()));
        }
        else {
            components.push(new Shader(ShaderPrograms.COLOR_PER_VERTEX));
            components.push(new MultiColor(Color.randomList(30)));
        }

        super({
            tag: 'shape',
            components
        });
    }

    public tick(): void {
        this.getComponent(Transform).rotate(Angle.toRadians(1));
    }
}
