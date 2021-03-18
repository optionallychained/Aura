import { Angle, Component, Core, Entity, Input, State, Vec2 } from '../../engine';
import { Axis2D } from '../entity/2d/axis';
import { RectFlat } from '../entity/2d/rect/rectFlat';

const player = new RectFlat(new Vec2(0, 0), new Vec2(100, 100));
const head = new RectFlat(new Vec2(0, 200), new Vec2(100, 100));

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    for (let i = -game.world.dimensions.x / 2; i <= game.world.dimensions.x / 2; i += game.world.dimensions.x / 10) {
        entities.push(new Axis2D(Angle.toRadians(90), i, 0, game.world.dimensions.y));

        for (let j = -game.world.dimensions.y / 2; j <= game.world.dimensions.y / 2 + 10; j += game.world.dimensions.y / 10) {
            entities.push(new Axis2D(0, 0, j, game.world.dimensions.x));
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

        // game.font.addString('hello', new Vec2(-0.75, 0.25), Color.random());
        // game.font.addString('protogl', new Vec2(-0.75, 0), Color.random());
        // game.font.addString('world', new Vec2(-0.75, -0.25), Color.random());
    },
    end: (game) => {
        game.world.clearEntities();
    },
    tick: (game) => {
        if (game.input.isKeyDown(Input.Keys.ENTER)) {
            game.switchToState('3D');
        }

        // const camera2D = game.world.getCamera2D();
        // const cameraTransform = camera2D.getComponent(Component.TwoD.Transform2D);

        const bodyTransform = player.getComponent(Component.TwoD.Transform2D);

        // bodyTransform.rotate(Angle.toRadians(1));

        if (game.input.isKeyDown(Input.Keys.A)) {
            bodyTransform.translate(new Vec2(-10, 0));
        }
        else if (game.input.isKeyDown(Input.Keys.D)) {
            bodyTransform.translate(new Vec2(10, 0));
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            bodyTransform.translate(new Vec2(0, 10));
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            bodyTransform.translate(new Vec2(0, -10));
        }

        if (game.input.isKeyDown(Input.Keys.Q)) {
            bodyTransform.rotate(Angle.toRadians(-1));
        }
        else if (game.input.isKeyDown(Input.Keys.E)) {
            bodyTransform.rotate(Angle.toRadians(1));
        }

        if (game.input.isKeyDown(Input.Keys.Z)) {
            bodyTransform.scaleBy(new Vec2(0.99, 0.99));
        }
        else if (game.input.isKeyDown(Input.Keys.X)) {
            bodyTransform.scaleBy(new Vec2(1.01, 1.01));
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
