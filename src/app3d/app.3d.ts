import { Core, Shader, Texture, Vec2, Vec3 } from '../engine';
import { MAIN_STATE } from './state/main.state';

const game = new Core.ThreeD.Game3D({
    canvasDimensions: new Vec2(1024, 768),
    world: {
        textureAtlas: new Texture.TextureAtlas('world', 'res/world.png', 2, 2),
        dimensions: new Vec3(1024 * 100, 768 * 100, 1000000),
        cameraOffsets: {
            position: new Vec3(0, 150, 500)
        }
    },
    debugMode: true,
    init: () => { console.log('GAME 3D -> init'); }
});

game.registerShader(Shader.Program.ThreeD.PROGRAM_BASIC_PERSPECTIVE_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_BASIC_ORTHO_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_PERSPECTIVE_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_TEXTURE_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_TEXTURE_COLORED_3D);

game.addState(MAIN_STATE);

game.start('main');
