import { Angle, Component, Core, Entity, Input, State, Vec2 } from '../../engine';
import { Game2D } from '../../engine/core';
import { Axis2D } from '../entity/axis';
import { RectFlat } from '../entity/rect/rectFlat';

const player = new RectFlat(new Vec2(0, 0), new Vec2(100, 100));

const populate = (game: Core.Game2D): void => {
    const entities: Array<Entity.Entity> = [];

    for (let x = -game.world.dimensions.x / 2; x <= game.world.dimensions.x / 2; x += game.world.dimensions.x / 10) {
        entities.push(new Axis2D(Angle.toRadians(90), x, 0, game.world.dimensions.y));

        for (let y = -game.world.dimensions.y / 2; y <= game.world.dimensions.y / 2 + 10; y += game.world.dimensions.y / 10) {
            entities.push(new Axis2D(0, 0, y, game.world.dimensions.x));
        }
    }

    entities.push(player);

    game.world.addEntities(...entities);

    game.world.activeCamera.attachTo(player);
};

export const MainState = new State.State2D({
    name: 'main',
    init: (game) => {
        populate(game);
    },
    end: (game) => {
        game.world.clearEntities();
    },
    tick: (game) => {
        const playerTransform = player.getComponent(Component.TwoD.Transform2D);
        const camera = game.world.activeCamera;

        if (game.input.isKeyDown(Input.Keys.A)) {
            // playerTransform.translate(new Vec2(-10, 0));
            playerTransform.moveRight(-10);
        }
        else if (game.input.isKeyDown(Input.Keys.D)) {
            // playerTransform.translate(new Vec2(10, 0));
            playerTransform.moveRight(10);
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            // playerTransform.translate(new Vec2(0, 10));
            playerTransform.moveUp(10);
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            // playerTransform.translate(new Vec2(0, -10));
            playerTransform.moveUp(-10);
        }

        if (game.input.isKeyDown(Input.Keys.Q)) {
            playerTransform.rotate(Angle.toRadians(-1));
        }
        else if (game.input.isKeyDown(Input.Keys.E)) {
            playerTransform.rotate(Angle.toRadians(1));
        }

        if (game.input.isKeyDown(Input.Keys.Z)) {
            playerTransform.scaleBy(new Vec2(0.99, 0.99));
        }
        else if (game.input.isKeyDown(Input.Keys.X)) {
            playerTransform.scaleBy(new Vec2(1.01, 1.01));
        }


        if (game.input.isKeyDown(Input.Keys.L)) {
            camera.moveRight(10);
            // camera.translate(new Vec2(10, 0));
        }
        else if (game.input.isKeyDown(Input.Keys.J)) {
            camera.moveRight(-10);
            // camera.translate(new Vec2(-10));
        }

        if (game.input.isKeyDown(Input.Keys.I)) {
            camera.moveUp(10);
            // camera.translate(new Vec2(0, 10));
        }
        else if (game.input.isKeyDown(Input.Keys.K)) {
            camera.moveUp(-10);
            // camera.translate(new Vec2(0, -10));
        }

        if (game.input.isKeyDown(Input.Keys.U)) {
            camera.rotate(Angle.toRadians(-1));
        }
        else if (game.input.isKeyDown(Input.Keys.O)) {
            camera.rotate(Angle.toRadians(1));
        }

        if (game.input.isKeyDown(Input.Keys.ARROW_UP)) {
            camera.zoom(new Vec2(0.99, 0.99));
        }
        else if (game.input.isKeyDown(Input.Keys.ARROW_DOWN)) {
            camera.zoom(new Vec2(1.01, 1.01));
        }

        if (game.input.isKeyDown(Input.Keys.SPACE)) {
            camera.reset();
        }
    }
});
