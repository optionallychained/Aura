import { State, Keys, Vec2 } from '../../engine/protogl';

/**
 * 'win' State for the Game, transitioned to on Game win and enabling transition back to 'main'
 */
export const winState = new State({
    name: 'win',
    // tick; execute per-frame State behaviour
    tick: (game) => {
        game.renderText('WIN! ENTER to play again', new Vec2(game.width / 4, game.height / 2));

        if (game.inputManager.isKeyDown(Keys.ENTER)) {
            game.switchToState('main');
        }
    }
});
