import { Keys } from '@input/keys';
import { Vec3 } from '@math/vec3';
import { ProtoGL } from '@protogl/protogl';

const game = new ProtoGL({
    width: 800,
    height: 600,
    background: new Vec3(200, 150, 200)
});

game.run(() => {
    if (game.keyPressed(Keys.A)) {
        console.log('A PRESSED');
    }
});
