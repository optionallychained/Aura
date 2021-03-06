import { Angle, Color, Component, Core, Entity, Input, Random, State, Vec2 } from '../../engine';
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

const rotations: Array<number> = [];
let frame = 0;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    const _generators = [
        // _createPoint2D,

        _createRectBatCat,
        _createRectBrick,
        _createRectCat,
        _createRectFlat,
        _createRectMulti,
        _createRectSmile,
        _createRectWire,

        _createTriangleBatCat,
        _createTriangleBrick,
        _createTriangleCat,
        _createTriangleFlat,
        _createTriangleMulti,
        _createTriangleSmile,
        _createTriangleWire
    ];

    for (let i = 0; i < 50; i++) {
        const r = Math.round(Random.between(1, _generators.length));

        entities.push(_generators[r - 1]());

        rotations.push(Angle.toRadians(Random.between(-3, 3)));
    }

    game.world.entityManager.addEntities(...entities);
};

const rotateAndScale = (game: Core.Game): void => {
    let i = 0;

    const scaleFactor = 1 + (Math.sin(frame * 0.025) * 0.8);
    const scale = new Vec2(scaleFactor, scaleFactor);

    for (const e of game.world.entityManager.filterEntitiesByComponentName('Transform2D')) {
        const transform = e.getComponent(Component.TwoD.Transform2D);

        transform.scale(scale);
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

        game.font.addString('red', new Vec2(-0.75, 0.25), new Color(255, 0, 0));
        game.font.addString('green', new Vec2(-0.75, 0), new Color(0, 255, 0));
        game.font.addString('blue', new Vec2(-0.75, -0.25), new Color(0, 0, 255));
    },
    end: (game) => {
        game.world.entityManager.clearEntities();
    },
    tick: (game) => {
        if (game.inputManager.isKeyDown(Input.Keys.ENTER)) {
            game.switchToState('3D');
        }

        rotateAndScale(game);
    }
});
