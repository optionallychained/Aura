import { Angle, Component, Core, Entity, Input, Random, State, Vec2 } from '../../engine';
import { _createRect } from '../entity/2d/rect';
import { _createRectBatCat } from '../entity/2d/rectBatCat';
import { _createRectCat } from '../entity/2d/rectCat';
import { _createRectSmile } from '../entity/2d/rectSmile';
import { _createRectWire } from '../entity/2d/rectWire';
import { _createRectWireTextured } from '../entity/2d/rectWireTextured';
import { _createTriangle } from '../entity/2d/triangle';
import { _createTriangleCat } from '../entity/2d/triangleCat';
import { _createTriangleWire } from '../entity/2d/triangleWire';
import { _createTriangleWireTextured } from '../entity/2d/triangleWireTextured';

const rotations: Array<number> = [];
let frame = 0;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    const _generators = [
        // _createRect,
        _createRectCat,
        // _createRectBatCat,
        // _createRectSmile,
        // _createRectWire,
        // _createRectWireTextured,
        // _createTriangle,
        // _createTriangleCat,
        // _createTriangleWire,
        // _createTriangleWireTextured
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

        game.font.addString(new Vec2(-0.75, 0), 'hello');
        game.font.addString(new Vec2(-0.75, -0.25), 'protogl');
    },
    tick: (game) => {
        if (game.inputManager.isKeyDown(Input.Keys.ENTER)) {
            game.switchToState('3D');
        }

        rotateAndScale(game);
    }
});
