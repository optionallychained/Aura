import { Game } from '../engine/protogl';
import { mainState } from './state/main';
import { winState } from './state/win';

const game = new Game({
    width: 800,
    height: 600,
    debugMode: true,
    init: () => { console.log('GAME -> init') }
});

game.addState(mainState);
game.addState(winState);

game.start('main');
