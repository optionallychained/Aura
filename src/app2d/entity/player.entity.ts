import { Color, Component, Core, Entity, Geometry, Shader, Vec2 } from '../../engine';
import { Health } from '../component/health.component';

export class Player extends Entity.Entity {

    constructor() {
        super({
            tag: 'player',
            components: [
                new Component.TwoD.Transform2D(new Vec2(0, 0), new Vec2(50, 50), 0, new Vec2(650, 0)),
                new Component.Generic.Model(Geometry.TwoD.BOX),
                new Component.Generic.Shader(Shader.Program.TwoD.PROGRAM_BASIC_2D),
                new Component.Generic.FlatColor(Color.green()),
                new Component.TwoD.BoxCollider2D(new Vec2(50, 50), (game, self, other) => {
                    if (other.tag === 'enemy') {
                        self.getComponent<Health>('Health').health -= 1;
                    }
                    else if (other.tag === 'food') {
                        game.setData('points', game.getData<number>('points') + 1);
                    }
                }),
                new Health(50)
            ]
        });
    }

    public tick(game: Core.TwoD.Game2D, frameDelta: number): void { }
}
