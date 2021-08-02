import { Color, Geometry, Input, State, Vec2 } from '../../engine';
import { Shape } from '../entity/shape.entity';

export const MENU_STATE = new State.TwoD.State2D({
    name: 'menu',
    init: (game) => {
        // game.font.addString(
        //     'Press Enter!',
        //     new Vec2(-260, 0),
        //     new Vec2(50, 50),
        //     Color.white()
        // );

        game.world.addEntity(new Shape(Geometry.TwoD.CIRCLE));
    },
    end: (game) => {
        game.font.clearEntities();
    },
    tick: (game) => {
        if (game.input.isKeyDown(Input.Keys.ENTER)) {
            game.switchToState('main');
        }
    }
});
