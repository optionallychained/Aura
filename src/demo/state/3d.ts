import { Angle, Component, Core, Entity, Input, Random, State, Vec3 } from '../../engine';
import { _createCubeBatCat } from '../entity/3d/cubeBatCat';
import { _createCubeBrick } from '../entity/3d/cubeBrick';
import { _createCubeCat } from '../entity/3d/cubeCat';
import { _createCubeFlat } from '../entity/3d/cubeFlat';
import { _createCubeMulti } from '../entity/3d/cubeMulti';
import { _createCubeSmile } from '../entity/3d/cubeSmile';
import { _createCubeWire } from '../entity/3d/cubeWire';
import { _createPoint3D } from '../entity/3d/point';

const rotations: Array<Vec3> = [];
let frame = 0;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    const _generators = [
        // _createPoint3D,

        _createCubeBatCat,
        _createCubeBrick,
        _createCubeCat,
        _createCubeFlat,
        _createCubeMulti,
        _createCubeSmile,
        _createCubeWire
    ];

    for (let i = 0; i < 15; i++) {
        const r = Math.round(Random.between(1, _generators.length));

        entities.push(_generators[r - 1]());

        const angleX = Angle.toRadians(Random.between(-3, 3));
        const angleY = Angle.toRadians(Random.between(-3, 3));
        const angleZ = Angle.toRadians(Random.between(-3, 3));

        rotations.push(new Vec3(angleX, angleY, angleZ));
    }

    game.world.addEntities(...entities);
};

const rotateAndScale = (game: Core.Game): void => {
    let i = 0;

    const scaleFactor = 1 + (Math.sin(frame * 0.025) * 0.25);
    const scale = new Vec3(scaleFactor, scaleFactor, scaleFactor);

    for (const e of game.world.filterEntitiesByComponentName('Transform3D')) {
        const transform = e.getComponent(Component.ThreeD.Transform3D);

        transform.scale(scale);
        transform.rotate(rotations[i]);

        i++;
    }

    frame++;
};

export const state3D = new State.State({
    name: '3D',
    renderingMode: '3D',
    init: (game) => {
        populate(game);
    },
    end: (game) => {
        game.world.clearEntities();
    },
    tick: (game) => {
        if (game.input.isKeyDown(Input.Keys.SPACE)) {
            game.switchToState('2D');
        }

        rotateAndScale(game);
    }
});
