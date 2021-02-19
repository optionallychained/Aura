import { Core, Shader, Vec2 } from '../engine';
import { State2D } from './state/2d';
import { state3D } from './state/3d';

// instantiate a Game (canvas is automatically created)
const game = new Core.Game({
    type: '3D',
    canvasDimensions: new Vec2(800, 600),
    debugMode: true,
    init: () => { console.log('GAME -> init') }
});

// register the built in color-per-vertex 2D shader program
// game.registerShader(Shader.Program.TwoD.PROGRAM_COLOR_PER_VERTEX);

// register the built in basic 3D shader program
game.registerShader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX);

// add the 2D State to the Game
// game.addState(State2D);

// // add the 3D State to the Game
game.addState(state3D);

// kick off the game's execution with the 2D state
// game.start('2D');

// kick off the game's execution with the 3D state
game.start('3D');
