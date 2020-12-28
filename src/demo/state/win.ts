import { Game, GameState, Keys, Vec2 } from '../../engine/protogl';

export const winState = new GameState({
    name: 'win',
    initFunc: (game: Game) => {
        game.entityManager.clearEntities();

        game.removeSystem('Physics');
        game.removeSystem('Collision');
    },
    tickFunc: (game: Game, frameDelta: number) => {
        game.renderText('WIN! ENTER to play again', new Vec2(game.getWidth() / 4, game.getHeight() / 2));

        if (game.keyPressed(Keys.ENTER)) {
            game.switchToState('main');
        }
    }
});
