import { FlatColor } from '@protogl/entity/component/flatColor';
import { Transform } from '@protogl/entity/component/transform';
import { Entity } from '@protogl/entity/entity';
import { Vec2 } from '@protogl/math/vec2';
import { Vec3 } from '@protogl/math/vec3';

export const enemy = new Entity({
    tag: 'enemy',
    onUpdate: () => { },
    components: [
        new FlatColor(new Vec3(255, 0, 0)),
        new Transform(new Vec2(), new Vec2(25, 25)),

    ]
});
