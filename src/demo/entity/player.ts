import { Entity, FlatColor, Transform, Vec2 } from '../../engine/protogl';

export const player = new Entity({
    tag: 'player',
    onUpdate: () => { },
    components: [
        new FlatColor(),
        new Transform(new Vec2(100, 100), new Vec2(50, 50))
    ]
});
