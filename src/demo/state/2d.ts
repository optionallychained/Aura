import { Angle, Component, Core, Entity, Input, Random, State, Vec2 } from '../../engine';
import { _createRect2 } from '../entity/2d/rec2';
import { _createRect1 } from '../entity/2d/rect1';
import { _createRectWire } from '../entity/2d/rectWire';
import { _createTriangle } from '../entity/2d/triangle';
import { _createTriangleWire } from '../entity/2d/triangleWire';

const rotations: Array<number> = [];
let frame = 0;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    for (let i = 0; i < 10; i++) {
        const r = Math.round(Random.between(2, 3));

        switch (r) {
            case 1:
                entities.push(_createRectWire());
                break;
            case 2:
                entities.push(_createRect1());
                break;
            case 3:
                entities.push(_createRect2());
                break;
            case 4:
                entities.push(_createTriangle());
                break;
            case 5:
                entities.push(_createTriangleWire());
                break;
            default:
                entities.push(_createRect1());
                break;
        }

        rotations.push(Angle.toRadians(Random.between(-3, 3)));
    }

    game.world.entityManager.addEntities(...entities);
};

const rotateAndScale = (game: Core.Game): void => {
    let i = 0;

    const scaleFactor = 1 + (Math.sin(frame * 0.025) * 0.8);
    const scale = new Vec2(scaleFactor, scaleFactor);

    for (const e of game.world.entityManager.filterEntitiesByTags('rect1', 'rect2', 'triangle', 'triangleWire', 'rectWire')) {
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
