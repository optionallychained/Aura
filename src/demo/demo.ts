import { Core, Shader, Vec2 } from '../engine';
import { ColorPerVertex } from './component/colorPerVertex.component';
import { PROGRAM_COLOR_PER_VERTEX } from './shader/program/colorPerVertex.program';
import { mainState } from './state/main';

// instantiate a Game (canvas is automatically created)
const game = new Core.Game({
    canvasDimensions: new Vec2(800, 600),
    debugMode: true,
    init: () => { console.log('GAME -> init') }
});

// register the engine-level (built-in) basic single-color shader program
game.registerShader(Shader.Program.PROGRAM_BASIC);

// register the application-level (custom) multicolor shader program
game.registerShader(PROGRAM_COLOR_PER_VERTEX);

// register a custom resolution for the shader variable 'VertexColor', resolving to a value in the application-level
//   (custom) ColorPerVertex Component
game.registerEntityShaderMapping('VertexColor', (e) => e.getComponent<ColorPerVertex>('ColorPerVertex')!.nextColor().float32Array);

// add the main State to the Game
game.addState(mainState);

// kick off the game's execution with the main state
game.start('main');
