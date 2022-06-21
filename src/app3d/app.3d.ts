import { Game, Vec2, Vec3 } from '../aura/aura.3d';
import { PROGRAM_BASIC } from '../aura/shader/program/3d/basic.program';
import { PROGRAM_FRONT_TEST } from './shader/program/frontTest.program';
import { SHAPES_STATE } from './state/shapes.state';
import { TEST_STATE } from './state/test.state';

const game = new Game({
    canvas: {
        dimensions: new Vec2(1024, 768),
        hideCursor: true
    },
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
    },
    states: [
        SHAPES_STATE,
        TEST_STATE
    ],
    shaders: [
        PROGRAM_FRONT_TEST,
        PROGRAM_BASIC
    ]
});

game.start(SHAPES_STATE.name);
