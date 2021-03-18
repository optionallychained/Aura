import { Angle, Component, Core, Entity, Input, State, Vec2 } from '../../engine';
import { Axis2D } from '../entity/2d/axis';
import { RectFlat } from '../entity/2d/rect/rectFlat';

const player = new RectFlat(new Vec2(0, 0), new Vec2(100, 100));

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    for (let x = -game.world.dimensions.x / 2; x <= game.world.dimensions.x / 2; x += game.world.dimensions.x / 10) {
        entities.push(new Axis2D(Angle.toRadians(90), x, 0, game.world.dimensions.y));

        for (let y = -game.world.dimensions.y / 2; y <= game.world.dimensions.y / 2 + 10; y += game.world.dimensions.y / 10) {
            entities.push(new Axis2D(0, 0, y, game.world.dimensions.x));
        }
    }

    entities.push(player);

    game.world.addEntities(...entities);

    game.world.getCamera2D().attachTo(player);
};

export const State2D = new State.State({
    name: '2D',
    renderingMode: '2D',
    init: (game) => {
        populate(game);
    },
    end: (game) => {
        game.world.clearEntities();
    },
    tick: (game) => {
        const playerTransform = player.getComponent(Component.TwoD.Transform2D);

        if (game.input.isKeyDown(Input.Keys.A)) {
            playerTransform.translate(new Vec2(-10, 0));
        }
        else if (game.input.isKeyDown(Input.Keys.D)) {
            playerTransform.translate(new Vec2(10, 0));
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            playerTransform.translate(new Vec2(0, 10));
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            playerTransform.translate(new Vec2(0, -10));
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
            game.world.getCamera2D().translate(new Vec2(10, 0));
        }
        else if (game.input.isKeyDown(Input.Keys.J)) {
            game.world.getCamera2D().translate(new Vec2(-10, 0));
        }

        if (game.input.isKeyDown(Input.Keys.I)) {
            game.world.getCamera2D().translate(new Vec2(0, 10));
        }
        else if (game.input.isKeyDown(Input.Keys.K)) {
            game.world.getCamera2D().translate(new Vec2(0, -10));
        }

        if (game.input.isKeyDown(Input.Keys.U)) {
            game.world.getCamera2D().rotate(Angle.toRadians(-1));
        }
        else if (game.input.isKeyDown(Input.Keys.O)) {
            game.world.getCamera2D().rotate(Angle.toRadians(1));
        }

        if (game.input.isKeyDown(Input.Keys.ARROW_UP)) {
            game.world.getCamera2D().zoom(new Vec2(0.99, 0.99));
        }
        else if (game.input.isKeyDown(Input.Keys.ARROW_DOWN)) {
            game.world.getCamera2D().zoom(new Vec2(1.01, 1.01));
        }

        if (game.input.isKeyDown(Input.Keys.SPACE)) {
            game.world.getCamera2D().reset();
        }
    }
});
