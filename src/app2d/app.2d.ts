import { Game, ShaderPrograms, Vec2 } from '../aura/index.2d';
import { SHAPES_STATE } from './state/shapes.state';

const game = new Game({
    canvasDimensions: new Vec2(1024, 768)
});

game.registerShader(ShaderPrograms.BASIC);
game.registerShader(ShaderPrograms.COLOR_PER_VERTEX);
game.registerShader(ShaderPrograms.TEXTURE);
game.registerShader(ShaderPrograms.TEXTURE_COLORED);

game.addState(SHAPES_STATE);

game.start(SHAPES_STATE.name);
