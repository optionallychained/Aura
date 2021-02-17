import { Angle, Core, Mat3, Shader, Vec2 } from '../engine';
import { mainState } from './state/main';

// instantiate a Game (canvas is automatically created)
const game = new Core.Game({
    canvasDimensions: new Vec2(800, 600),
    debugMode: true,
    init: () => { console.log('GAME -> init') }
});

game.registerShader(Shader.Program.PROGRAM_BASIC);

game.overrideEntityShaderMapping('Transform', (e) => Mat3.rotate(new Mat3(), Angle.toRadians(45)).float32Array);

// add our States to the Game
game.addState(mainState);

// kick off the game's execution with the main state
game.start('main');
