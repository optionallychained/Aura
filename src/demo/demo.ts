import { mainState } from '@demo/state/main';
import { winState } from '@demo/state/win';
import { ProtoGL } from '@protogl/protogl';

const game = new ProtoGL({
    width: 800,
    height: 600,
    initFunc: () => { console.log('GAME -> init') }
});

game.addState(mainState);
game.addState(winState);

game.start('main');
