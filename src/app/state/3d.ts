import { Angle, Component, Core, Entity, Input, Random, State, Vec3 } from '../../engine';
import { Axis3D } from '../entity/3d/axis';
import { CubeMulti } from '../entity/3d/cubeMulti';

const player = new CubeMulti(new Vec3(1024 * 100 / 2, 1500, 1000000 / 2), new Vec3(100, 100, 100));

const rotations: Array<Vec3> = [];

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

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

    entities.push(player);

    game.world.addEntities(...entities);

    // game.world.getCamera3D().attachTo(player, { angle: { x: false, y: true, z: false } });
};

export const state3D = new State.State({
    name: '3D',
    renderingMode: '3D',
    init: (game) => {
        populate(game);
    },
    end: (game) => {
        game.world.clearEntities();
    },
    tick: (game) => {
        // let i = 0;
        // for (const e of game.world.filterEntitiesByTag('cubeMulti')) {
        //     e.getComponent(Component.ThreeD.Transform3D).rotate(rotations[i]);

        //     i++;
        // }

        // const playerTransform = player.getComponent(Component.ThreeD.Transform3D);

        // if (game.input.isKeyDown(Input.Keys.A)) {
        //     playerTransform.translate(new Vec3(-100, 0, 0));
        // }
        // else if (game.input.isKeyDown(Input.Keys.D)) {
        //     playerTransform.translate(new Vec3(100, 0, 0));
        // }

        // if (game.input.isKeyDown(Input.Keys.W)) {
        //     playerTransform.translate(new Vec3(0, 0, -100));
        // }
        // else if (game.input.isKeyDown(Input.Keys.S)) {
        //     playerTransform.translate(new Vec3(0, 0, 100));
        // }

        // if (game.input.isKeyDown(Input.Keys.Q)) {
        //     playerTransform.translate(new Vec3(0, -100, 0));
        // }
        // else if (game.input.isKeyDown(Input.Keys.E)) {
        //     playerTransform.translate(new Vec3(0, 100, 0));
        // }

        // if (game.input.isKeyDown(Input.Keys.Z)) {
        //     playerTransform.rotate(new Vec3(0, Angle.toRadians(-1), 0));
        // }


        const camera = game.world.getCamera3D();

        if (game.input.isKeyDown(Input.Keys.A)) {
            camera.moveRight(-100);
        }
        else if (game.input.isKeyDown(Input.Keys.D)) {
            camera.moveRight(100);
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            camera.moveForward(100);
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            camera.moveForward(-100);
        }

        if (game.input.isKeyDown(Input.Keys.Q)) {
            camera.moveUp(-100);
        }
        else if (game.input.isKeyDown(Input.Keys.E)) {
            camera.moveUp(100);
        }


        if (game.input.isKeyDown(Input.Keys.I)) {
            camera.rotateX(Angle.toRadians(1));
        }
        else if (game.input.isKeyDown(Input.Keys.K)) {
            camera.rotateX(Angle.toRadians(-1));
        }

        if (game.input.isKeyDown(Input.Keys.L)) {
            camera.rotateY(Angle.toRadians(-1));
        }
        else if (game.input.isKeyDown(Input.Keys.J)) {
            camera.rotateY(Angle.toRadians(1));
        }

        if (game.input.isKeyDown(Input.Keys.U)) {
            camera.rotateZ(Angle.toRadians(-1));
        }
        else if (game.input.isKeyDown(Input.Keys.O)) {
            camera.rotateZ(Angle.toRadians(1));
        }

        // if (game.input.isKeyDown(Input.Keys.L)) {
        //     game.world.getCamera3D().moveRight(250);
        // }
        // else if (game.input.isKeyDown(Input.Keys.J)) {
        //     game.world.getCamera3D().moveRight(-250);
        // }

        // if (game.input.isKeyDown(Input.Keys.I)) {
        //     game.world.getCamera3D().moveForward(250);
        // }
        // else if (game.input.isKeyDown(Input.Keys.K)) {
        //     game.world.getCamera3D().moveForward(-250);
        // }

        // if (game.input.isKeyDown(Input.Keys.U)) {
        //     game.world.getCamera3D().moveUp(-250);
        // }
        // else if (game.input.isKeyDown(Input.Keys.O)) {
        //     game.world.getCamera3D().moveUp(250);
        // }


        // if (game.input.isKeyDown(Input.Keys.NUM_PAD_6)) {
        //     game.world.getCamera3D().rotate(new Vec3(0, Angle.toRadians(2.5), 0));
        // }
        // else if (game.input.isKeyDown(Input.Keys.NUM_PAD_4)) {
        //     game.world.getCamera3D().rotate(new Vec3(0, Angle.toRadians(-2.5), 0));
        // }

        // if (game.input.isKeyDown(Input.Keys.NUM_PAD_8)) {
        //     game.world.getCamera3D().rotate(new Vec3(Angle.toRadians(2.5), 0, 0));
        // }
        // else if (game.input.isKeyDown(Input.Keys.NUM_PAD_5)) {
        //     game.world.getCamera3D().rotate(new Vec3(Angle.toRadians(-2.5), 0, 0));
        // }

        // if (game.input.isKeyDown(Input.Keys.NUM_PAD_9)) {
        //     game.world.getCamera3D().rotate(new Vec3(0, 0, Angle.toRadians(2.5)));
        // }
        // else if (game.input.isKeyDown(Input.Keys.NUM_PAD_7)) {
        //     game.world.getCamera3D().rotate(new Vec3(0, 0, Angle.toRadians(-2.5)));
        // }

        // if (game.input.isKeyDown(Input.Keys.SPACE)) {
        //     game.world.getCamera3D().reset();
        // }
    }
});
