import { Keys } from '@input/keys';
import { Vec3 } from '@math/vec3';
import { ProtoGL } from '@protogl/protogl';
import { GameState } from '@protogl/state/gameState';

const game = new ProtoGL({
    width: 800,
    height: 600,
    background: new Vec3(200, 150, 200),
    initFunc: (): void => { console.log('GAME -> init') }
});

game.addState(new GameState({
    name: 'state-1',
    initFunc: (): void => {
        console.log('state-1 -> init');
    },
    tickFunc: (): void => {
        if (game.keyPressed(Keys.SPACE)) {
            game.switchToState('state-2');
        }
    }
}));

game.addState(new GameState({
    name: 'state-2',
    initFunc: (): void => {
        console.log('state-2 -> init');
    },
    tickFunc: (): void => {
        if (game.keyPressed(Keys.ENTER)) {
            game.switchToState('state-1');
        }
    }
}))

game.start('state-1');
