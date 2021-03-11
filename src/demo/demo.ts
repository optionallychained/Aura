import { Core, Shader, Vec2 } from '../engine';
import { TextureAtlas } from '../engine/texture';
import { State2D } from './state/2d';
import { state3D } from './state/3d';

// instantiate a Game (canvas is automatically created)
const game = new Core.Game({
    canvasDimensions: new Vec2(1024, 768),
    world: {
        textureAtlas: new TextureAtlas('world', 'res/world.png', 2, 2)
    },
    debugMode: true,
    init: () => { console.log('GAME -> init') }
});

// register all built-in 2D Shader Programs
game.registerShader(Shader.Program.TwoD.PROGRAM_COLOR_PER_VERTEX_2D);
game.registerShader(Shader.Program.TwoD.PROGRAM_TEXTURE_2D);
game.registerShader(Shader.Program.TwoD.PROGRAM_BASIC_2D);
game.registerShader(Shader.Program.TwoD.PROGRAM_TEXTURE_COLORED_2D);

// register all built-in 3D Shader Programs
game.registerShader(Shader.Program.ThreeD.PROGRAM_BASIC_PERSPECTIVE_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_BASIC_ORTHO_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_TEXTURE_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_TEXTURE_COLORED_3D);

// add the 2D State to the Game
game.addState(State2D);

// // add the 3D State to the Game
game.addState(state3D);

// kick off the game's execution with the 3D state
game.start('3D');
