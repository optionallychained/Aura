import { Core, Shader, Vec2 } from '../engine';
import { TextureAtlas } from '../engine/texture';
import { MainState } from './state/main.state';

const game = new Core.Game2D({
    canvasDimensions: new Vec2(1024, 768),
    world: {
        textureAtlas: new TextureAtlas('world', 'res/world.png', 2, 2),
        dimensions: new Vec2(1024 * 2, 768 * 2),
    },
    debugMode: true,
    init: () => { console.log('GAME 2D -> init'); }
});

game.registerShader(Shader.Program.TwoD.PROGRAM_COLOR_PER_VERTEX_2D);
game.registerShader(Shader.Program.TwoD.PROGRAM_TEXTURE_2D);
game.registerShader(Shader.Program.TwoD.PROGRAM_BASIC_2D);
game.registerShader(Shader.Program.TwoD.PROGRAM_TEXTURE_COLORED_2D);

game.addState(MainState);

game.start('main');
