import { FlatColor } from '@protogl/entity/component/flatColor';
import { Transform } from '@protogl/entity/component/transform';
import { Entity } from '@protogl/entity/entity';
import { Vec2 } from '@protogl/math/vec2';

export const player = new Entity({
    tag: 'player',
    onUpdate: () => { },
    components: [
        new FlatColor(),
        new Transform(new Vec2(100, 100), new Vec2(50, 50))
    ]
});
