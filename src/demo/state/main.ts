import { Angle, Color, Component, Core, Entity, Mat3, Random, State, Vec2 } from '../../engine';
import { _createRect } from '../entity/rect';
import { _createRectWire } from '../entity/rectWire';
import { _createTriangle } from '../entity/triangle';
import { _createTriangleWire } from '../entity/triangleWire';

const rotations: Array<number> = [];
let frame = 0;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    for (let i = 0; i < 10; i++) {
        const r = Math.round(Random.between(1, 5));
        const color = Color.random();

        switch (r) {
            case 1:
                entities.push(_createRectWire(color));
                break;
            case 2:
                entities.push(_createRect(color));
                break;
            case 3:
                entities.push(_createTriangle(color));
                break;
            case 4:
                entities.push(_createTriangleWire(color));
                break;
            default:
                entities.push(_createTriangleWire(color));
                break;
        }

        rotations.push(Angle.toRadians(Random.between(0.5, 3)));
    }

    game.entityManager.addEntities(...entities);
};

let lastScaleFactor = 0;
const rotateAndScale = (game: Core.Game): void => {
    let i = 0;

    const scaleFactor = 1 + (Math.sin(frame * 0.025) * 0.8);
    const scale = new Vec2(scaleFactor - lastScaleFactor + 1, scaleFactor - lastScaleFactor + 1);
    lastScaleFactor = scaleFactor;

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
