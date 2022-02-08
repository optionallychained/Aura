import { Core, Shader, Vec2 } from '../engine';
import { SHAPES_STATE } from './state/shapes.state';

const game = new Core.TwoD.Game2D({
    canvasDimensions: new Vec2(1024, 768)
});

game.registerShader(Shader.Program.TwoD.PROGRAM_BASIC_2D);
game.registerShader(Shader.Program.TwoD.PROGRAM_COLOR_PER_VERTEX_2D)
game.registerShader(Shader.Program.TwoD.PROGRAM_TEXTURE_2D);
game.registerShader(Shader.Program.TwoD.PROGRAM_TEXTURE_COLORED_2D);

game.addState(SHAPES_STATE);

game.start(SHAPES_STATE.name);
