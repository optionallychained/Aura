import { Angle, Color, Component, Core, Entity, Mat3, Random, State } from '../../engine';
import { _createRect } from '../entity/rect';
import { _createRectWire } from '../entity/rectWire';
import { _createTriangle } from '../entity/triangle';
import { _createTriangleWire } from '../entity/triangleWire';

const rotations: Array<number> = [];

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    for (let i = 0; i < 1000; i++) {
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

        rotations.push(Angle.toRadians(Random.between(0.25, 2.5)));
    }

    game.entityManager.addEntities(...entities);
};

const rotate = (game: Core.Game): void => {
    let i = 0;
    for (const e of game.entityManager.filterEntitiesByTags('rect', 'triangle', 'triangleWire', 'rectWire')) {
        const transform = e.getComponent<Component.Transform>('Transform');

        transform.transform = Mat3.rotate(transform.transform, rotations[i]);
        i++;
    }
}

const rect = _createRect(new Color(0, 255, 0));
const rect2 = _createRect(new Color(0, 0, 255, 0.5));
const triangle = _createTriangle(new Color(255, 0, 0));
let timeout1: number;
let timeout2: number;
let timeout3: number;

export const mainState = new State.State({
    name: 'main',
    init: (game) => {
        // populate(game);
        // game.entityManager.addEntities(rect, triangle, rect2);
    },
    tick: (game) => {
        // rotate(game);

        if (!timeout1) {
            timeout1 = window.setTimeout(() => {
                game.entityManager.addEntity(rect);

                clearTimeout(timeout1);
            }, 5000);
        }

        if (!timeout2) {
            timeout2 = window.setTimeout(() => {
                game.entityManager.addEntity(triangle);

                clearTimeout(timeout2);
            }, 10000);
        }

        if (!timeout3) {
            timeout3 = window.setTimeout(() => {
                game.entityManager.addEntity(rect2);

                clearTimeout(timeout3);
            }, 15000);
        }
    }
});
