import { Keys } from '@protogl/input/keys';
import { Vec2 } from '@protogl/math/vec2';
import { Vec3 } from '@protogl/math/vec3';
import { FlatColor } from '@protogl/entity/component/flatColor';
import { Transform } from '@protogl/entity/component/transform';
import { Entity } from '@protogl/entity/entity';
import { ProtoGL } from '@protogl/protogl';
import { GameState } from '@protogl/state/gameState';

const game = new ProtoGL({
    width: 800,
    height: 600,
    background: new Vec3(200, 150, 200),
    initFunc: (): void => { console.log('GAME -> init') }
});

game.addState(new GameState({
    name: 'state-1',
    initFunc: (): void => {
        console.log('state-1 -> init');

        game.entityManager.clearEntities();

        game.entityManager.addEntity(new Entity({
            tag: 'Player-1',
            onUpdate: (): void => { console.log('Player-1 update') },
            components: [
                new FlatColor(),
                new Transform(new Vec2(100, 100), new Vec2(50, 50))
            ]
        }))
    },
    tickFunc: (): void => {
        if (game.keyPressed(Keys.SPACE)) {
            game.switchToState('state-2');
        }
    }
}));

game.addState(new GameState({
    name: 'state-2',
    initFunc: (): void => {
        console.log('state-2 -> init');

        game.entityManager.clearEntities();

        game.entityManager.addEntity(new Entity({
            tag: 'Player-2',
            onUpdate: (): void => { console.log('Player-2 update') },
            components: [
                new FlatColor(new Vec3(255, 0, 0)),
                new Transform(new Vec2(200, 200), new Vec2(100, 100))
            ]
        }))
    },
    tickFunc: (): void => {
        if (game.keyPressed(Keys.ENTER)) {
            game.switchToState('state-1');
        }
    }
}))

game.start('state-1');
