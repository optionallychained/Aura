import { Vec2 } from '../../../engine/protogl';

test('vec2', () => {
    expect(new Vec2()).toHaveProperty('x', 0);
});
