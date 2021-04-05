import { Angle, Component, Core, Entity, Input, Random, State, Vec3 } from '../../engine';
import { Axis3D } from '../entity/axis';
import { CubeMulti } from '../entity/cube/cubeMulti';

const player = new CubeMulti(new Vec3(0, 1500, 1000000 / 2), new Vec3(100, 100, 100), 'player');

const rotations: Array<Vec3> = [];

const populate = (game: Core.ThreeD.Game3D): void => {
    const entities: Array<Entity.Entity> = [];

    entities.push(player);

    for (let x = -game.world.dimensions.x / 2; x <= game.world.dimensions.x / 2; x += game.world.dimensions.x / 100) {
        entities.push(new Axis3D('z', new Vec3(x, 0, 0), game.world.dimensions.z));
    }

    for (let z = -game.world.dimensions.z / 2; z <= game.world.dimensions.z / 2; z += game.world.dimensions.z / 100) {
        entities.push(new Axis3D('x', new Vec3(0, 0, z), game.world.dimensions.x));
    }

    for (let i = 0; i < 100; i++) {
        const position = new Vec3(
            Random.between(-game.world.dimensions.x / 2, game.world.dimensions.x / 2),
            Random.between(0, game.world.dimensions.y / 2),
            Random.between(-game.world.dimensions.z / 2, game.world.dimensions.z / 2),
        );
        const scale = new Vec3(Random.between(1024 * 10, 1024 * 20), Random.between(768 * 10, 768 * 20), Random.between(1000, 10000));

        entities.push(new CubeMulti(position, scale));

        rotations.push(new Vec3(
            Angle.toRadians(Random.between(-2, 2)),
            Angle.toRadians(Random.between(-2, 2)),
            Angle.toRadians(Random.between(-2, 2)),
        ));
    }

    game.world.addEntities(...entities);

    game.world.activeCamera.attachTo(player);
};

export const MAIN_STATE = new State.ThreeD.State3D({
    name: 'main',
    init: (game) => {
        populate(game);
    },
    end: (game) => {
        game.world.clearEntities();
    },
    tick: (game) => {
        const playerTransform = player.getComponent(Component.ThreeD.Transform3D);
        const camera = game.world.activeCamera;

        const transform = playerTransform;

        if (game.input.isKeyDown(Input.Keys.A)) {
            transform.moveRight(-350);
        }
        else if (game.input.isKeyDown(Input.Keys.D)) {
            transform.moveRight(350);
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            transform.moveForward(350);
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            transform.moveForward(-350);
        }

        if (game.input.isKeyDown(Input.Keys.Q)) {
            transform.moveUp(-350);
        }
        else if (game.input.isKeyDown(Input.Keys.E)) {
            transform.moveUp(350);
        }

        if (game.input.isKeyDown(Input.Keys.O)) {
            transform.rotateZ(Angle.toRadians(2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.U)) {
            transform.rotateZ(Angle.toRadians(-2.5));
        }

        if (game.input.isKeyDown(Input.Keys.L)) {
            transform.rotateY(Angle.toRadians(-2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.J)) {
            transform.rotateY(Angle.toRadians(2.5));
        }

        if (game.input.isKeyDown(Input.Keys.I)) {
            transform.rotateX(Angle.toRadians(2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.K)) {
            transform.rotateX(Angle.toRadians(-2.5));
        }

        if (game.input.isKeyDown(Input.Keys.NUM_PAD_4)) {
            camera.rotateY(Angle.toRadians(-2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.NUM_PAD_6)) {
            camera.rotateY(Angle.toRadians(2.5));
        }

        if (game.input.isKeyDown(Input.Keys.NUM_PAD_8)) {
            camera.rotateX(Angle.toRadians(-2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.NUM_PAD_5)) {
            camera.rotateX(Angle.toRadians(2.5));
        }

        if (game.input.isKeyDown(Input.Keys.NUM_PAD_9)) {
            camera.rotateZ(Angle.toRadians(2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.NUM_PAD_7)) {
            camera.rotateZ(Angle.toRadians(-2.5));
        }
    }
});
