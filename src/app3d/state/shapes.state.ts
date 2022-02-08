import { Angle, Geometry, Input, Random, State, Vec3 } from '../../engine';
import { Axis } from '../entity/axis';
import { Shape } from '../entity/shape';

export const SHAPES_STATE = new State.ThreeD.State3D({
    name: 'shapes',
    init: (game) => {
        game.world.activeCamera.moveForward(-90000);
        game.world.activeCamera.moveRight(-50000);
        game.world.activeCamera.rotateY(Angle.toRadians(-45));
        game.world.activeCamera.rotateX(Angle.toRadians(-45));

        const shapeScale = 10000;

        const geometries = [
            Geometry.ThreeD.BOX,
            Geometry.ThreeD.F,
            Geometry.ThreeD.LINE,
            Geometry.ThreeD.OCTAHEDRON,
            Geometry.ThreeD.PRISM_HEXAGONAL,
            Geometry.ThreeD.PRISM_TRIANGULAR,
            Geometry.ThreeD.PYRAMID_HEXAGONAL,
            Geometry.ThreeD.PYRAMID_SQUARE,
            Geometry.ThreeD.TETRAHEDRON,
            Geometry.ThreeD.Wireframe.BOX,
            Geometry.ThreeD.Wireframe.F,
            Geometry.ThreeD.Wireframe.OCTAHEDRON,
            Geometry.ThreeD.Wireframe.PRISM_HEXAGONAL,
            Geometry.ThreeD.Wireframe.PRISM_TRIANGULAR,
            Geometry.ThreeD.Wireframe.PYRAMID_HEXAGONAL,
            Geometry.ThreeD.Wireframe.PYRAMID_SQUARE,
            Geometry.ThreeD.Wireframe.TETRAHEDRON
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
        if (game.input.isKeyDown(Input.Keys.A)) {
            camera.moveRight(-cameraMove);
        }
        else if (game.input.isKeyDown(Input.Keys.D)) {
            camera.moveRight(cameraMove);
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            camera.moveForward(cameraMove);
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            camera.moveForward(-cameraMove);
        }

        if (game.input.isKeyDown(Input.Keys.Q)) {
            camera.moveUp(-cameraMove);
        }
        else if (game.input.isKeyDown(Input.Keys.E)) {
            camera.moveUp(cameraMove);
        }

        if (game.input.isKeyDown(Input.Keys.J)) {
            camera.rotateY(cameraAngle);
        }
        else if (game.input.isKeyDown(Input.Keys.L)) {
            camera.rotateY(-cameraAngle);
        }

        if (game.input.isKeyDown(Input.Keys.I)) {
            camera.rotateX(cameraAngle);
        }
        else if (game.input.isKeyDown(Input.Keys.K)) {
            camera.rotateX(-cameraAngle);
        }

        if (game.input.isKeyDown(Input.Keys.U)) {
            camera.rotateZ(-cameraAngle);
        }
        else if (game.input.isKeyDown(Input.Keys.O)) {
            camera.rotateZ(cameraAngle);
        }
    }
});
