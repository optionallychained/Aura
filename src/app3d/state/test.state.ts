import { Angle, Component, Geometry, Input, State } from '../../engine';
import { Axis } from '../entity/axis';
import { Shape } from '../entity/shape';

export const TEST_STATE = new State.ThreeD.State3D({
    name: 'test',
    init: (game) => {
        game.world.addEntity(new Axis('x', game.world.dimensions.x));
        game.world.addEntity(new Axis('y', game.world.dimensions.y));
        game.world.addEntity(new Axis('z', game.world.dimensions.z));

        game.world.addEntity(new Shape(Geometry.ThreeD.PRISM_HEXAGONAL));
    },
    end: () => { },
    tick: (game) => {
        const shapeTransform = game.world.filterEntitiesByTag('shape')[0]?.getComponent<Component.ThreeD.Transform3D>('Transform3D');
        const camera = game.world.activeCamera;

        const cameraAngle = Angle.toRadians(0.5);
        const cameraMove = 2;
        const shapeAngle = Angle.toRadians(2.5);

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

        // shape controls
        if (game.input.isKeyDown(Input.Keys.ARROW_LEFT)) {
            shapeTransform.rotateY(shapeAngle);
        }
        else if (game.input.isKeyDown(Input.Keys.ARROW_RIGHT)) {
            shapeTransform.rotateY(-shapeAngle);
        }

        if (game.input.isKeyDown(Input.Keys.ARROW_UP)) {
            shapeTransform.rotateX(shapeAngle);
        }
        else if (game.input.isKeyDown(Input.Keys.ARROW_DOWN)) {
            shapeTransform.rotateX(-shapeAngle);
        }
    }
});
