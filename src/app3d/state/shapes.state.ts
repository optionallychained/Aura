import { F_WIREFRAME } from '../../aura/geometry/2d/wireframe/f.wireframe.geometry.2d';
import { CUBE } from '../../aura/geometry/3d/cube.geometry.3d';
import { F } from '../../aura/geometry/3d/f.geometry.3d';
import { LINE } from '../../aura/geometry/3d/line.geometry.3d';
import { OCTAHEDRON } from '../../aura/geometry/3d/octahedron.geometry.3d';
import { PRISM_HEXAGONAL } from '../../aura/geometry/3d/prismHexagonal.geometry.3d';
import { PRISM_TRIANGULAR } from '../../aura/geometry/3d/prismTriangular.geometry.3d';
import { PYRAMID_HEXAGONAL } from '../../aura/geometry/3d/pyramidHexagonal.geometry.3d';
import { PYRAMID_SQUARE } from '../../aura/geometry/3d/pyramidSquare.geometry.3d';
import { TETRAHEDRON } from '../../aura/geometry/3d/tetrahedron.geometry.3d';
import { CUBE_WIREFRAME } from '../../aura/geometry/3d/wireframe/cube.wireframe.geometry.3d';
import { OCTAHEDRON_WIREFRAME } from '../../aura/geometry/3d/wireframe/octahedron.wireframe.geometry.3d';
import { PRISM_HEXAGONAL_WIREFRAME } from '../../aura/geometry/3d/wireframe/prismHexagonal.wireframe.geometry';
import { PRISM_TRIANGULAR_WIREFRAME } from '../../aura/geometry/3d/wireframe/prismTriangular.wireframe.geometry.3d';
import { PYRAMID_HEXAGONAL_WIREFRAME } from '../../aura/geometry/3d/wireframe/pyramidHexagonal.wireframe.geometry.3d';
import { PYRAMID_SQUARE_WIREFRAME } from '../../aura/geometry/3d/wireframe/pyramidSquare.wireframe.geometry.3d';
import { TETRAHEDRON_WIREFRAME } from '../../aura/geometry/3d/wireframe/tetrahedron.wireframe.geometry.3d';
import { Keys } from '../../aura/input/keys.enum';
import { Angle } from '../../aura/math/angle';
import { Random } from '../../aura/math/random';
import { Vec3 } from '../../aura/math/vec3';
import { State3D } from '../../aura/state/3d/state.3d';
import { Axis } from '../entity/axis';
import { Shape } from '../entity/shape';

export const SHAPES_STATE = new State3D({
    name: 'shapes',
    init: (game) => {
        game.world.activeCamera.moveForward(-90000);
        game.world.activeCamera.moveRight(-50000);
        game.world.activeCamera.rotateY(Angle.toRadians(-45));
        game.world.activeCamera.rotateX(Angle.toRadians(-45));

        const shapeScale = 10000;

        const geometries = [
            CUBE,
            F,
            LINE,
            OCTAHEDRON,
            PRISM_HEXAGONAL,
            PRISM_TRIANGULAR,
            PYRAMID_HEXAGONAL,
            PYRAMID_SQUARE,
            TETRAHEDRON,
            CUBE_WIREFRAME,
            F_WIREFRAME,
            OCTAHEDRON_WIREFRAME,
            PRISM_HEXAGONAL_WIREFRAME,
            PRISM_TRIANGULAR_WIREFRAME,
            PYRAMID_HEXAGONAL_WIREFRAME,
            PYRAMID_SQUARE_WIREFRAME,
            TETRAHEDRON_WIREFRAME
        ];

        for (let i = -game.world.dimensions.x / 2; i <= game.world.dimensions.x / 2; i += shapeScale) {
            for (let j = -game.world.dimensions.y / 2; j <= game.world.dimensions.y / 2; j += shapeScale) {
                for (let k = -game.world.dimensions.z / 10; k <= game.world.dimensions.z / 10; k += shapeScale) {
                    const geometry = geometries[Math.floor(Random.between(0, geometries.length))];

                    game.world.addEntity(new Shape(geometry, new Vec3(i, j, k), shapeScale * 0.25));
                }
            }
        }

        game.world.addEntity(new Axis('x', game.world.dimensions.x));
        game.world.addEntity(new Axis('y', game.world.dimensions.y));
        game.world.addEntity(new Axis('z', game.world.dimensions.z));
    },
    end: () => { },
    tick: (game) => {
        const camera = game.world.activeCamera;

        const cameraAngle = Angle.toRadians(0.5);
        const cameraMove = 200;

        // camera controls
        if (game.input.isKeyDown(Keys.A)) {
            camera.moveRight(-cameraMove);
        }
        else if (game.input.isKeyDown(Keys.D)) {
            camera.moveRight(cameraMove);
        }

        if (game.input.isKeyDown(Keys.W)) {
            camera.moveForward(cameraMove);
        }
        else if (game.input.isKeyDown(Keys.S)) {
            camera.moveForward(-cameraMove);
        }

        if (game.input.isKeyDown(Keys.Q)) {
            camera.moveUp(-cameraMove);
        }
        else if (game.input.isKeyDown(Keys.E)) {
            camera.moveUp(cameraMove);
        }

        if (game.input.isKeyDown(Keys.J)) {
            camera.rotateY(cameraAngle);
        }
        else if (game.input.isKeyDown(Keys.L)) {
            camera.rotateY(-cameraAngle);
        }

        if (game.input.isKeyDown(Keys.I)) {
            camera.rotateX(cameraAngle);
        }
        else if (game.input.isKeyDown(Keys.K)) {
            camera.rotateX(-cameraAngle);
        }

        if (game.input.isKeyDown(Keys.U)) {
            camera.rotateZ(-cameraAngle);
        }
        else if (game.input.isKeyDown(Keys.O)) {
            camera.rotateZ(cameraAngle);
        }
    }
});
