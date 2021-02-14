import { Angle, Component, Mat3, State } from '../../engine';
import { rect } from '../entity/rect';
import { rectWire } from '../entity/rectWire';
import { triangle } from '../entity/triangle';
import { triangleWire } from '../entity/triangleWire';

export const mainState = new State.State({
    name: 'main',
    init: (game) => {
        game.entityManager.addEntities(rect, rectWire, triangle, triangleWire)
    },
    tick: (game) => {
        const { entityManager } = game;

        const rect = entityManager.filterEntitiesByTag('rect')[0];
        const triangle = entityManager.filterEntitiesByTag('triangle')[0];
        const rectWire = entityManager.filterEntitiesByTag('rectWire')[0];
        const triangleWire = entityManager.filterEntitiesByTag('triangleWire')[0];

        if (!rect || !triangle || !rectWire || !triangleWire) {
            // this is only necessary due to the EntityManager's 1-frame delay on adding Entities
            // evaluate this
            return;
        }

        const rTransform = rect.getComponent<Component.Transform>('Transform');
        const rwTransform = rectWire.getComponent<Component.Transform>('Transform');
        const tTransform = triangle.getComponent<Component.Transform>('Transform');
        const twTransform = triangleWire.getComponent<Component.Transform>('Transform');

        rTransform.transform = Mat3.rotate(rTransform.transform, Angle.toRadians(-1.5));

        rwTransform.transform = Mat3.rotate(rwTransform.transform, Angle.toRadians(1));

        tTransform.transform = Mat3.rotate(tTransform.transform, Angle.toRadians(-1));

        twTransform.transform = Mat3.rotate(twTransform.transform, Angle.toRadians(1.5));
    }
});
