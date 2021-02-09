import { Game } from '../engine/protogl';
import { FRAGMENT_BASIC } from '../engine/screen/shaders/frag/fragment.basic';
import { VERTEX_BASIC } from '../engine/screen/shaders/vert/vertex.basic';
import { mainState } from './state/main';
import { winState } from './state/win';

// instantiate a Game (canvas is automatically created)
const game = new Game({
    width: 800,
    height: 600,
    debugMode: true,
    init: () => { console.log('GAME -> init') }
});

game.addShader({
    name: 'basic',
    vertexSource: VERTEX_BASIC,
    fragmentSource: FRAGMENT_BASIC
});

// add our States to the Game
game.addStates(mainState, winState);

// kick off the game's execution with the main state
game.start('main');
