import { Angle, Color, Component, Core, Entity, Input, Random, State, Vec2 } from '../../engine';
import { Axis2D } from '../entity/2d/axis';
import { Point2D } from '../entity/2d/point';
import { RectBatCat } from '../entity/2d/rect/rectBatCat';
import { RectBrick } from '../entity/2d/rect/rectBrick';
import { RectCat } from '../entity/2d/rect/rectCat';
import { RectFlat } from '../entity/2d/rect/rectFlat';
import { RectMulti } from '../entity/2d/rect/rectMulti';
import { RectSmile } from '../entity/2d/rect/rectSmile';
import { RectWire } from '../entity/2d/rect/rectWire';
import { TriangleBatCat } from '../entity/2d/triangle/triangleBatCat';
import { TriangleBrick } from '../entity/2d/triangle/triangleBrick';
import { TriangleCat } from '../entity/2d/triangle/triangleCat';
import { TriangleFlat } from '../entity/2d/triangle/triangleFlat';
import { TriangleMulti } from '../entity/2d/triangle/triangleMulti';
import { TriangleSmile } from '../entity/2d/triangle/triangleSmile';
import { TriangleWire } from '../entity/2d/triangle/triangleWire';


const rotations: Array<number> = [];
let frame = 0;
let cameraZoom = 1;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    // const _entities = [
    //     RectBatCat,
    //     RectBrick,
    //     RectCat,
    //     // RectFlat,
    //     RectMulti,
    //     RectSmile,
    //     RectWire,

    //     TriangleBatCat,
    //     TriangleBrick,
    //     TriangleCat,
    //     TriangleFlat,
    //     TriangleMulti,
    //     TriangleSmile,
    //     TriangleWire
    // ];

    // for (let i = 0; i < 1; i++) {
    //     const r = Math.round(Random.between(1, _entities.length));

    //     entities.push(new _entities[r - 1]());

    //     rotations.push(Angle.toRadians(Random.between(-3, 3)));
    // }

    entities.push(new Axis2D(0));
    entities.push(new Axis2D(Angle.toRadians(90)));

    entities.push(new RectFlat(1, 1));
    entities.push(new RectFlat(1, 3));
    entities.push(new RectFlat(3, 1));
    entities.push(new RectFlat(3, 3));

    rotations.push(Angle.toRadians(Random.between(-3, 3)));
    rotations.push(Angle.toRadians(Random.between(-3, 3)));
    rotations.push(Angle.toRadians(Random.between(-3, 3)));
    rotations.push(Angle.toRadians(Random.between(-3, 3)));

    game.world.addEntities(...entities);
};

const rotateAndScale = (game: Core.Game): void => {
    let i = 0;

    const scaleFactor = 1 + (Math.sin(frame * 0.025) * 0.8);
    const translateFactorX = (Math.sin(frame * 0.05) * 2.5);
    const translateFactorY = (Math.cos(frame * 0.05) * 2.5);
    const scale = new Vec2(scaleFactor, scaleFactor);
    const translate = new Vec2(translateFactorX, translateFactorY);

    for (const e of game.world.filterEntitiesByTags('rectFlat', 'rectBatCat')) {
        const transform = e.getComponent(Component.TwoD.Transform2D);

        // transform.translate(translate);
        // transform.scale(scale);
        transform.rotate(rotations[i]);
        i++;
    }

    frame++;
}

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

        const camera2D = game.world.getCamera2D();
        const cameraTransform = camera2D.getComponent(Component.TwoD.Transform2D);

        if (game.input.isKeyDown(Input.Keys.D)) {
            cameraTransform.translate(new Vec2(-10, 0));
        }
        else if (game.input.isKeyDown(Input.Keys.A)) {
            cameraTransform.translate(new Vec2(10, 0));
        }

        if (game.input.isKeyDown(Input.Keys.W)) {
            cameraTransform.translate(new Vec2(0, -10));
        }
        else if (game.input.isKeyDown(Input.Keys.S)) {
            cameraTransform.translate(new Vec2(0, 10));
        }

        if (game.input.isKeyDown(Input.Keys.Q)) {
            cameraTransform.rotate(Angle.toRadians(1));
        }
        else if (game.input.isKeyDown(Input.Keys.E)) {
            cameraTransform.rotate(Angle.toRadians(-1));
        }

        if (game.input.isKeyDown(Input.Keys.Z)) {
            cameraZoom -= 0.01;
        }
        else if (game.input.isKeyDown(Input.Keys.X)) {
            cameraZoom += 0.01;
        }

        cameraTransform.scale(new Vec2(cameraZoom, cameraZoom));

        rotateAndScale(game);
    }
});
