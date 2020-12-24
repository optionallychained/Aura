import { Keys } from '@input/keys';
import { ProtoGL } from '@protogl/protogl';

const game = new ProtoGL({ width: 800, height: 600 });

game.start(() => {
    if (game.keyPressed(Keys.A)) {
        console.log('A PRESSED');
    }
});
