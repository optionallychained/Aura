import { Angle, Color, Component, Core, Entity, Input, Mat3, Random, State, Vec2 } from '../../engine';
import { _createRectMulti } from '../entity/2d/rect/rectMulti';
import { _createRectBatCat } from '../entity/2d/rect/rectBatCat';
import { _createRectCat } from '../entity/2d/rect/rectCat';
import { _createRectSmile } from '../entity/2d/rect/rectSmile';
import { _createRectWire } from '../entity/2d/rect/rectWire';
import { _createTriangleFlat } from '../entity/2d/triangle/triangleFlat';
import { _createTriangleCat } from '../entity/2d/triangle/triangleCat';
import { _createTriangleWire } from '../entity/2d/triangle/triangleWire';
import { _createRectFlat } from '../entity/2d/rect/rectFlat';
import { _createRectBrick } from '../entity/2d/rect/rectBrick';
import { _createTriangleBatCat } from '../entity/2d/triangle/triangleBatCat';
import { _createTriangleBrick } from '../entity/2d/triangle/triangleBrick';
import { _createTriangleMulti } from '../entity/2d/triangle/triangleMulti';
import { _createTriangleSmile } from '../entity/2d/triangle/triangleSmile';
import { _createPoint2D } from '../entity/2d/point';
import { WebGLRenderer } from '../../engine/renderer';
import { _createLine2D } from '../entity/2d/line';
import { _createCamera } from '../entity/2d/camera';

const rotations: Array<number> = [];
let frame = 0;
let cameraZoom = 1;

const camera = _createCamera();

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    const _generators = [
        // _createPoint2D,

        _createRectBatCat,
        // _createRectBrick,
        // _createRectCat,
        // _createRectFlat,
        // _createRectMulti,
        // _createRectSmile,
        // _createRectWire,

        // _createTriangleBatCat,
        // _createTriangleBrick,
        // _createTriangleCat,
        // _createTriangleFlat,
        // _createTriangleMulti,
        // _createTriangleSmile,
        // _createTriangleWire
    ];

    for (let i = 0; i < 1; i++) {
        const r = Math.round(Random.between(1, _generators.length));

        entities.push(_generators[r - 1]());

        rotations.push(Angle.toRadians(Random.between(-3, 3)));
    }

    entities.push(_createLine2D(0));
    entities.push(_createLine2D(Angle.toRadians(90)));

    entities.push(_createRectFlat(1, 1));
    entities.push(_createRectFlat(1, 3));
    entities.push(_createRectFlat(3, 1));
    entities.push(_createRectFlat(3, 3));

    rotations.push(Angle.toRadians(Random.between(-3, 3)));
    rotations.push(Angle.toRadians(Random.between(-3, 3)));
    rotations.push(Angle.toRadians(Random.between(-3, 3)));
    rotations.push(Angle.toRadians(Random.between(-3, 3)));

    game.world.entityManager.addEntities(...entities);
};

const rotateAndScale = (game: Core.Game): void => {
    let i = 0;

    const scaleFactor = 1 + (Math.sin(frame * 0.025) * 0.8);
    const translateFactorX = (Math.sin(frame * 0.05) * 2.5);
    const translateFactorY = (Math.cos(frame * 0.05) * 2.5);
    const scale = new Vec2(scaleFactor, scaleFactor);
    const translate = new Vec2(translateFactorX, translateFactorY);

    for (const e of game.world.entityManager.filterEntitiesByTags('rectFlat', 'rectBatCat')) {
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

        game.font.addString('hello', new Vec2(-0.75, 0.25), Color.random());
        // game.font.addString('protogl', new Vec2(-0.75, 0), Color.random());
        // game.font.addString('world', new Vec2(-0.75, -0.25), Color.random());
    },
    end: (game) => {
        game.world.entityManager.clearEntities();
    },
    tick: (game) => {
        if (game.input.isKeyDown(Input.Keys.ENTER)) {
            game.switchToState('3D');
        }


        const cameraTransform = camera.getComponent(Component.TwoD.Transform2D);
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

        WebGLRenderer.VIEW = cameraTransform.compute();

        rotateAndScale(game);
    }
});
