import { Keys } from '@protogl/input/keys';
import { Vec2 } from '@protogl/math/vec2';
import { ProtoGL } from '@protogl/protogl';
import { GameState } from '@protogl/state/gameState';

export const winState = new GameState({
    name: 'win',
    initFunc: (game: ProtoGL) => {
        game.entityManager.clearEntities();

        game.removeSystem('physics');
        game.removeSystem('collision');
    },
    tickFunc: (game: ProtoGL, frameDelta: number) => {
        game.renderText('WIN! ENTER to play again', new Vec2(game.getWidth() / 4, game.getHeight() / 2));

        if (game.keyPressed(Keys.ENTER)) {
            game.switchToState('main');
        }
    }
});
