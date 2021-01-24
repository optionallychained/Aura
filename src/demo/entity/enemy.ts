import { Entity, FlatColor, Transform, Vec2, Vec3 } from '../../engine/protogl';

export const enemy = new Entity({
    tag: 'enemy',
    components: [
        new FlatColor(new Vec3(255, 0, 0)),
        new Transform(new Vec2(), new Vec2(25, 25)),
    ]
});
