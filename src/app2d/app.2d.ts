import { Game2D } from '../aura/core/2d/game.2d';
import { Vec2 } from '../aura/math/vec2';
import { PROGRAM_BASIC_2D } from '../aura/shader/program/2d/basic.program.2d';
import { PROGRAM_COLOR_PER_VERTEX_2D } from '../aura/shader/program/2d/colorPerVertex.program.2d';
import { PROGRAM_TEXTURE_2D } from '../aura/shader/program/2d/texture.program.2d';
import { PROGRAM_TEXTURE_COLORED_2D } from '../aura/shader/program/2d/textureColored.program.2d';
import { SHAPES_STATE } from './state/shapes.state';

const game = new Game2D({
    canvasDimensions: new Vec2(1024, 768)
});

game.registerShader(PROGRAM_BASIC_2D);
game.registerShader(PROGRAM_COLOR_PER_VERTEX_2D);
game.registerShader(PROGRAM_TEXTURE_2D);
game.registerShader(PROGRAM_TEXTURE_COLORED_2D);

game.addState(SHAPES_STATE);

game.start(SHAPES_STATE.name);
