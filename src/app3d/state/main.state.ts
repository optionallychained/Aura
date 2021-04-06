import { Angle, Component, Core, Entity, Input, Random, State, Vec3 } from '../../engine';
import { Transform3D } from '../../engine/component/3d';
import { Axis3D } from '../entity/axis';
import { CubeMulti } from '../entity/cube/cubeMulti';

const rotations: Array<Vec3> = [];

const populate = (game: Core.ThreeD.Game3D): void => {
    const entities: Array<Entity.Entity> = [];

    const player = new CubeMulti(new Vec3(0, 0, game.world.dimensions.z / 2), new Vec3(100, 100, 100), 'player')

    entities.push(player);

    for (let x = -game.world.dimensions.x / 2; x <= game.world.dimensions.x / 2; x += game.world.dimensions.x / 100) {
        entities.push(new Axis3D('z', new Vec3(x, 0, 0), game.world.dimensions.z));
    }

    for (let z = -game.world.dimensions.z / 2; z <= game.world.dimensions.z / 2; z += game.world.dimensions.z / 100) {
        entities.push(new Axis3D('x', new Vec3(0, 0, z), game.world.dimensions.x));
    }


    // for (let i = 0; i < 100; i++) {
    //     const position = new Vec3(
    //         Random.between(-game.world.dimensions.x / 2, game.world.dimensions.x / 2),
    //         Random.between(0, game.world.dimensions.y / 2),
    //         Random.between(-game.world.dimensions.z / 2, game.world.dimensions.z / 2),
    //     );
    //     const scale = new Vec3(Random.between(1024 * 10, 1024 * 20), Random.between(768 * 10, 768 * 20), Random.between(1000, 10000));

    //     entities.push(new CubeMulti(position, scale));

    //     rotations.push(new Vec3(
    //         Angle.toRadians(Random.between(-2, 2)),
    //         Angle.toRadians(Random.between(-2, 2)),
    //         Angle.toRadians(Random.between(-2, 2)),
    //     ));
    // }

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

        // let i = 0;
        // const cubes = game.world.filterEntitiesByTag('cubeMulti');
        // for (const e of cubes) {
        //     e.getComponent(Transform3D).rotate(rotations[i]);
        //     i++;
        // }

        const playerTransform = game.world.filterEntitiesByTag('player')[0]?.getComponent(Component.ThreeD.Transform3D);
        const camera = game.world.activeCamera;

        // playerTransform?.rotateZ(Angle.toRadians(1.5));
        // playerTransform?.moveForward(500);
        // playerTransform?.moveRight(-250);

        if (game.input.isKeyDown(Input.Keys.A)) {
            playerTransform.moveRight(-350);
        }
        else if (game.input.isKeyDown(Input.Keys.D)) {
            playerTransform.moveRight(350);
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            playerTransform.moveForward(350);
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            playerTransform.moveForward(-350);
        }

        if (game.input.isKeyDown(Input.Keys.Q)) {
            playerTransform.moveUp(-350);
        }
        else if (game.input.isKeyDown(Input.Keys.E)) {
            playerTransform.moveUp(350);
        }

        if (game.input.isKeyDown(Input.Keys.O)) {
            playerTransform.rotateZ(Angle.toRadians(2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.U)) {
            playerTransform.rotateZ(Angle.toRadians(-2.5));
        }

        if (game.input.isKeyDown(Input.Keys.L)) {
            playerTransform.rotateY(Angle.toRadians(-2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.J)) {
            playerTransform.rotateY(Angle.toRadians(2.5));
        }

        if (game.input.isKeyDown(Input.Keys.I)) {
            playerTransform.rotateX(Angle.toRadians(2.5));
        }
        else if (game.input.isKeyDown(Input.Keys.K)) {
            playerTransform.rotateX(Angle.toRadians(-2.5));
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
