import { Angle, Color, Component, Core, Entity, Geometry, Shader, Vec2 } from '../../engine';

export class Food extends Entity.Entity {

    private rotateDir: number;

    constructor(position: Vec2) {
        super({
            tag: 'food',
            components: [
                new Component.TwoD.Transform2D(position, new Vec2(25, 25), 0, new Vec2()),
                new Component.Generic.Model(Geometry.TwoD.BOX),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.Generic.FlatColor(Color.yellow()),
                new Component.TwoD.BoxCollider2D()
            ]
        });

        this.rotateDir = Math.random() <= 0.5 ? -1 : 1;
    }

    public tick(): void {
        this.getComponent<Component.TwoD.Transform2D>('Transform2D').rotate(Angle.toRadians(1) * this.rotateDir);
    }

    public onCollisionStart(game: Core.TwoD.Game2D, other: Entity.Entity): void {
        if (other.tag === 'player') {
            game.world.removeEntity(this);
        }
    }
}
