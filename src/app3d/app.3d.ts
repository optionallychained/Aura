import { Game3D } from '../aura/core/3d/game.3d';
import { Vec2 } from '../aura/math/vec2';
import { Vec3 } from '../aura/math/vec3';
import { PROGRAM_BASIC_3D } from '../aura/shader/program/3d/basic.program.3d';
import { PROGRAM_COLOR_PER_VERTEX_3D } from '../aura/shader/program/3d/colorPerVertex.program.3d';
import { PROGRAM_TEXTURE_3D } from '../aura/shader/program/3d/texture.program.3d';
import { PROGRAM_TEXTURE_COLORED_3D } from '../aura/shader/program/3d/textureColored.program.3d';
import { PROGRAM_FRONT_TEST } from './shader/program/frontTest.program';
import { SHAPES_STATE } from './state/shapes.state';
import { TEST_STATE } from './state/test.state';

const game = new Game3D({
    canvasDimensions: new Vec2(1024, 768),
    world: {
        dimensions: new Vec3(1024 * 100, 768 * 100, 1000000),
        camera: {
            offset: {
                // from top
                // angles: new Vec3(Angle.toRadians(-90), 0, 0),
                // position: new Vec3(0, 150, 0)

                // from bottom
                // angles: new Vec3(Angle.toRadians(90), 0, 0),
                // position: new Vec3(0, -150, 0)

                // from left
                // angles: new Vec3(0, Angle.toRadians(-90), 0),
                // position: new Vec3(-150, 0, 0)

                // from right
                // angles: new Vec3(0, Angle.toRadians(90), 0),
                // position: new Vec3(150, 0, 0)

                // from back
                // angles: new Vec3(0, Angle.toRadians(-180), 0),
                // position: new Vec3(0, 0, -150)

                // from front
                position: new Vec3(0, 0, 150)
            }
        }
    }
});

game.registerShader(PROGRAM_BASIC_3D);
game.registerShader(PROGRAM_COLOR_PER_VERTEX_3D);
game.registerShader(PROGRAM_TEXTURE_3D);
game.registerShader(PROGRAM_TEXTURE_COLORED_3D);

game.registerShader(PROGRAM_FRONT_TEST);

game.addStates(SHAPES_STATE, TEST_STATE);

game.start(SHAPES_STATE.name);
