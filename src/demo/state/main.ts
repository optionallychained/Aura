import { Angle, Component, Mat3, State } from '../../engine';
import { _createRect } from '../entity/rect';
import { rectWire } from '../entity/rectWire';
import { _createTriangle } from '../entity/triangle';
import { triangleWire } from '../entity/triangleWire';

export const mainState = new State.State({
    name: 'main',
    init: (game) => {
        // game.entityManager.addEntities(_createRect(), _createRect());//, rectWire, triangle, triangleWire)
        game.entityManager.addEntities(_createRect(), _createTriangle(), _createRect(), _createTriangle(), _createRect(), _createTriangle());
    },
    tick: (game) => {
        const { entityManager } = game;

        const [rect1, rect2, rect3] = entityManager.filterEntitiesByTag('rect');


        const [triangle1, triangle2, triangle3] = entityManager.filterEntitiesByTag('triangle');

        if (!rect1 || !rect2 || !rect3 || !triangle1 || !triangle2 || !triangle3) {
            // this is only necessary due to the EntityManager's 1-frame delay on adding Entities
            // evaluate this
            return;
        }

        const r1Transform = rect1.getComponent<Component.Transform>('Transform');
        const r2Transform = rect2.getComponent<Component.Transform>('Transform');
        const r3Transform = rect3.getComponent<Component.Transform>('Transform');

        const t1Transform = triangle1.getComponent<Component.Transform>('Transform');
        const t2Transform = triangle2.getComponent<Component.Transform>('Transform');
        const t3Transform = triangle3.getComponent<Component.Transform>('Transform');

        r1Transform.transform = Mat3.rotate(r1Transform.transform, Angle.toRadians(1.5));
        r2Transform.transform = Mat3.rotate(r2Transform.transform, Angle.toRadians(2));
        r3Transform.transform = Mat3.rotate(r3Transform.transform, Angle.toRadians(2.5));

        t1Transform.transform = Mat3.rotate(t1Transform.transform, Angle.toRadians(-0.5));
        t2Transform.transform = Mat3.rotate(t2Transform.transform, Angle.toRadians(-0.25));
        t3Transform.transform = Mat3.rotate(t3Transform.transform, Angle.toRadians(-0.75));

        // rwTransform.transform = Mat3.rotate(rwTransform.transform, Angle.toRadians(1));

        // tTransform.transform = Mat3.rotate(tTransform.transform, Angle.toRadians(-1));

        // twTransform.transform = Mat3.rotate(twTransform.transform, Angle.toRadians(1.5));
    }
});
