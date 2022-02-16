import { Transform3D } from '../../aura/component/3d/transform.component.3d';
import { F_WIREFRAME } from '../../aura/geometry/3d/wireframe/f.wireframe.geometry.3d';
import { Keys } from '../../aura/input/keys.enum';
import { Angle } from '../../aura/math/angle';
import { State3D } from '../../aura/state/3d/state.3d';
import { Axis } from '../entity/axis';
import { Shape } from '../entity/shape';

export const TEST_STATE = new State3D({
    name: 'test',
    init: (game) => {
        game.world.addEntity(new Axis('x', game.world.dimensions.x));
        game.world.addEntity(new Axis('y', game.world.dimensions.y));
        game.world.addEntity(new Axis('z', game.world.dimensions.z));

        game.world.addEntity(new Shape(F_WIREFRAME));
    },
    end: () => { },
    tick: (game) => {
        const shapeTransform = game.world.filterEntitiesByTag('shape')[0]?.getComponent<Transform3D>('Transform3D');
        const camera = game.world.activeCamera;

        const cameraAngle = Angle.toRadians(0.5);
        const cameraMove = 2;
        const shapeAngle = Angle.toRadians(2.5);

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

        // shape controls
        if (game.input.isKeyDown(Keys.ARROW_LEFT)) {
            shapeTransform.rotateY(shapeAngle);
        }
        else if (game.input.isKeyDown(Keys.ARROW_RIGHT)) {
            shapeTransform.rotateY(-shapeAngle);
        }

        if (game.input.isKeyDown(Keys.ARROW_UP)) {
            shapeTransform.rotateX(shapeAngle);
        }
        else if (game.input.isKeyDown(Keys.ARROW_DOWN)) {
            shapeTransform.rotateX(-shapeAngle);
        }
    }
});
