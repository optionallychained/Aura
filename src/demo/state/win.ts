import { Game, State, Keys, Vec2 } from '../../engine/protogl';

export const winState = new State({
    name: 'win',
    init: (game: Game) => {
        game.entityManager.clearEntities();

        game.removeSystem('Physics');
        game.removeSystem('Collision');
    },
    tick: (game: Game) => {
        game.renderText('WIN! ENTER to play again', new Vec2(game.getWidth() / 4, game.getHeight() / 2));

        if (game.inputManager.isKeyDown(Keys.ENTER)) {
            game.switchToState('main');
        }
    }
});
