import { Color, Component, Entity, Geometry, Random, Shader, Vec2 } from '../../../engine';

export const _createCamera = (): Entity.Entity => {
    return new Entity.Entity({
        tag: 'camera_2d',
        components: [
            new Component.TwoD.Transform2D()
        ]
    });
};
