import { Angle, Component, Core, Entity, Random, State, Vec2 } from '../../engine';
import { _createRect } from '../entity/rect';
import { _createRectWire } from '../entity/rectWire';
import { _createTriangle } from '../entity/triangle';
import { _createTriangleWire } from '../entity/triangleWire';

const rotations: Array<number> = [];
let frame = 0;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    for (let i = 0; i < 100; i++) {
        const r = Math.round(Random.between(1, 4));

        switch (r) {
            case 1:
                entities.push(_createRectWire());
                break;
            case 2:
                entities.push(_createRect());
                break;
            case 3:
                entities.push(_createTriangle());
                break;
            case 4:
                entities.push(_createTriangleWire());
                break;
            default:
                entities.push(_createRect());
                break;
        }

        rotations.push(Angle.toRadians(Random.between(0.5, 3)));
    }

    game.entityManager.addEntities(...entities);
};

const rotateAndScale = (game: Core.Game): void => {
    let i = 0;

    const scaleFactor = 1 + (Math.sin(frame * 0.025) * 0.8);
    const scale = new Vec2(scaleFactor, scaleFactor);

    for (const e of game.entityManager.filterEntitiesByTags('rect', 'triangle', 'triangleWire', 'rectWire')) {
        const transform = e.getComponent<Component.Transform>('Transform');

        transform.scale(scale);
        transform.rotate(rotations[i]);
        i++;
    }

    frame++;
}

export const mainState = new State.State({
    name: 'main',
    init: (game) => {
        populate(game);
    },
    tick: (game) => {
        rotateAndScale(game);
    }
});
