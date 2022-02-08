import { Angle, Core, Shader, Vec2, Vec3 } from '../engine';
import { PROGRAM_FRONT_TEST } from './shader/program/frontTest.program';
import { SHAPES_STATE } from './state/shapes.state';
import { TEST_STATE } from './state/test.state';

const game = new Core.ThreeD.Game3D({
    canvasDimensions: new Vec2(1024, 768),
    world: {
        dimensions: new Vec3(1024 * 100, 768 * 100, 1000000),
        camera: {
            offset: {
                // angles: new Vec3(Angle.toRadians(-90), 0, 0)
                position: new Vec3(0, 150, 500)
            }
        }
    }
});

game.registerShader(Shader.Program.ThreeD.PROGRAM_BASIC_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_COLOR_PER_VERTEX_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_TEXTURE_3D);
game.registerShader(Shader.Program.ThreeD.PROGRAM_TEXTURE_COLORED_3D);

game.registerShader(PROGRAM_FRONT_TEST);

game.addStates(SHAPES_STATE, TEST_STATE);

game.start(TEST_STATE.name);
