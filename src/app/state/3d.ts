import { Component, Core, Entity, Input, State, Vec3 } from '../../engine';
import { Axis3D } from '../entity/3d/axis';
import { CubeFlat } from '../entity/3d/cubeFlat';

const player = new CubeFlat(new Vec3(0, 0, 0), new Vec3(100, 100, 100));

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    entities.push(new Axis3D('x'));
    entities.push(new Axis3D('y'));
    entities.push(new Axis3D('z'));

    entities.push(player);

    game.world.addEntities(...entities);

    // game.world.getCamera3D().attachTo(player);
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
        if (game.input.isKeyDown(Input.Keys.SPACE)) {
            game.switchToState('2D');
        }

        const playerTransform = player.getComponent(Component.ThreeD.Transform3D);

        if (game.input.isKeyDown(Input.Keys.A)) {
            playerTransform.translate(new Vec3(-10, 0, 0));
        }
        else if (game.input.isKeyDown(Input.Keys.D)) {
            playerTransform.translate(new Vec3(10, 0, 0));
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            playerTransform.translate(new Vec3(0, 0, -10));
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            playerTransform.translate(new Vec3(0, 0, 10));
        }

        if (game.input.isKeyDown(Input.Keys.Q)) {
            playerTransform.translate(new Vec3(0, 10, 0));
        }
        else if (game.input.isKeyDown(Input.Keys.E)) {
            playerTransform.translate(new Vec3(0, -10, 0));
        }
    }
});
