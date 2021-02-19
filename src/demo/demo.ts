import { Core, Shader, Vec2 } from '../engine';
import { mainState } from './state/main';

// instantiate a Game (canvas is automatically created)
const game = new Core.Game({
    canvasDimensions: new Vec2(800, 600),
    debugMode: true,
    init: () => { console.log('GAME -> init') }
});

// register the built in color-per-vertex shader program
game.registerShader(Shader.Program.PROGRAM_COLOR_PER_VERTEX);

// add the main State to the Game
game.addState(mainState);

// kick off the game's execution with the main state
game.start('main');
