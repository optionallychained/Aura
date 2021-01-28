import { Entity } from '../../../engine/protogl';

test('entity', () => {
    expect(new Entity({ tag: 'test' }).getTag()).toBe('test');
});
