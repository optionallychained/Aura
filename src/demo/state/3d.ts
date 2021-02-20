import { Angle, Component, Core, Entity, Random, State, Vec3 } from '../../engine';
import { _createCube } from '../entity/3d/cube';
import { _createCubeWire } from '../entity/3d/cubeWire';

const rotations: Array<Vec3> = [];
let frame = 0;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    for (let i = 0; i < 1; i++) {
        const r = Math.round(Random.between(2, 2));

        switch (r) {
            case 1:
                entities.push(_createCube());
                break;
            case 2:
                entities.push(_createCubeWire());
                break;
            default:
                entities.push(_createCube());
                break;
        }

        const angleX = Angle.toRadians(Random.between(-3, 3));
        const angleY = Angle.toRadians(Random.between(-3, 3));
        const angleZ = Angle.toRadians(Random.between(-3, 3));

        rotations.push(new Vec3(angleX, angleY, angleZ));
    }

    game.entityManager.addEntities(...entities);
};

const rotateAndScale = (game: Core.Game): void => {
    let i = 0;

    const scaleFactor = 1 + (Math.sin(frame * 0.025) * 0.25);
    const scale = new Vec3(scaleFactor, scaleFactor, scaleFactor);

    for (const e of game.entityManager.filterEntitiesByTags('cube', 'cubeWire')) {
        const transform = e.getComponent<Component.ThreeD.Transform3D>('Transform3D');

        // transform.scale(scale);
        transform.rotate(rotations[i]);

        i++;
    }

    frame++;
};

export const state3D = new State.State({
    name: '3D',
    init: (game) => {
        populate(game);
    },
    tick: (game) => {
        rotateAndScale(game);
    }
});
