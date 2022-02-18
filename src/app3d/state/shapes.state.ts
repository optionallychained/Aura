import { State, Angle, Geometries, Random, Vec3, Keys } from '../../aura/aura.3d';
import { Axis } from '../entity/axis';
import { Shape } from '../entity/shape';

export const SHAPES_STATE = new State({
    name: 'shapes',
    init: (game) => {
        game.world.activeCamera.moveForward(-90000);
        game.world.activeCamera.moveRight(-50000);
        game.world.activeCamera.rotateY(Angle.toRadians(-45));
        game.world.activeCamera.rotateX(Angle.toRadians(-45));

        const shapeScale = 10000;

        const geometries = [
            Geometries.CUBE,
            Geometries.F,
            Geometries.LINE,
            Geometries.OCTAHEDRON,
            Geometries.PRISM_HEXAGONAL,
            Geometries.PRISM_TRIANGULAR,
            Geometries.PYRAMID_HEXAGONAL,
            Geometries.PYRAMID_SQUARE,
            Geometries.TETRAHEDRON,
            Geometries.Wireframe.CUBE,
            Geometries.Wireframe.F,
            Geometries.Wireframe.OCTAHEDRON,
            Geometries.Wireframe.PRISM_HEXAGONAL,
            Geometries.Wireframe.PRISM_TRIANGULAR,
            Geometries.Wireframe.PYRAMID_HEXAGONAL,
            Geometries.Wireframe.PYRAMID_SQUARE,
            Geometries.Wireframe.TETRAHEDRON
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
