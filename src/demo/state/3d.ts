import { Angle, Component, Core, Entity, Input, Random, State, Vec3 } from '../../engine';
import { CubeBatCat } from '../entity/3d/cubeBatCat';
import { CubeBrick } from '../entity/3d/cubeBrick';
import { CubeCat } from '../entity/3d/cubeCat';
import { CubeFlat } from '../entity/3d/cubeFlat';
import { CubeMulti } from '../entity/3d/cubeMulti';
import { CubeSmile } from '../entity/3d/cubeSmile';
import { CubeWire } from '../entity/3d/cubeWire';
import { Point3D } from '../entity/3d/point';


const rotations: Array<Vec3> = [];
let frame = 0;

const populate = (game: Core.Game): void => {
    const entities: Array<Entity.Entity> = [];

    const _entities = [
        CubeBatCat,
        CubeBrick,
        CubeCat,
        CubeFlat,
        CubeMulti,
        CubeSmile,
        CubeWire,
        Point3D
    ];

    for (let i = 0; i < 15; i++) {
        const r = Math.round(Random.between(1, _entities.length));

        entities.push(new _entities[r - 1]());

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
