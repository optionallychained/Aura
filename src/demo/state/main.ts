import { player } from '@demo/entity/player';
import { enemy } from '@demo/entity/enemy';
import { AABBCollisionBox } from '@protogl/entity/component/AABBCollisionBox';
import { Transform } from '@protogl/entity/component/transform';
import { Keys } from '@protogl/input/keys';
import { MathUtils } from '@protogl/math/mathUtils';
import { Vec2 } from '@protogl/math/vec2';
import { ProtoGL } from '@protogl/protogl';
import { GameState } from '@protogl/state/gameState';
import { CollisionSystem } from '@protogl/system/collisionSystem';
import { PhysicsSystem } from '@protogl/system/physicsSystem';

const randomPosition = (game: ProtoGL): Vec2 => {
    return new Vec2(MathUtils.randomBetween(50, game.getWidth() - 50), MathUtils.randomBetween(50, game.getHeight() - 50))
}

export const mainState = new GameState({
    name: 'main',
    initFunc: (game: ProtoGL) => {
        game.setData('points', 0);

        game.addSystem(new PhysicsSystem(game));
        game.addSystem(new CollisionSystem(game));

        game.entityManager.clearEntities();

        // done here just for game access in collision callback
        // TODO better way of achieving
        player.addComponent(new AABBCollisionBox(new Vec2(50, 50), () => {
            game.setData('points', game.getData('points') as number + 1);
        }));

        enemy.addComponent(new AABBCollisionBox(new Vec2(50, 50), () => {
            // TODO: real solution to enabling this type of thing
            game.entityManager.removeEntity(enemy);
        }))

        game.entityManager.addEntity(player);
        game.entityManager.addEntity(enemy);

        (enemy.getComponentByName('Transform') as Transform).position = randomPosition(game);
    },
    tickFunc: (game: ProtoGL) => {
        game.renderText(`Points: ${game.getData('points') ?? 0}`);

        // super dutty
        const player = game.entityManager.filterEntitiesByTag('player')[0];
        if (!player) {
            return;
        }

        const transform = player.getComponentByName('Transform') as Transform;

        // movement
        if (game.keyPressed(Keys.A)) {
            transform.velocity.set(-50, 0);
        }
        else if (game.keyPressed(Keys.D)) {
            transform.velocity.set(50, 0);
        }
        else if (game.keyPressed(Keys.W)) {
            transform.velocity.set(0, -50);
        }
        else if (game.keyPressed(Keys.S)) {
            transform.velocity.set(0, 50);
        }
        else if (game.keyPressed(Keys.SPACE)) {
            transform.velocity.set();
        }

        // position wrapping
        if (transform.position.x > game.getWidth()) {
            transform.position.setX(0);
        }
        else if ((transform.position.x + transform.dimensions.x) < 0) {
            transform.position.setX(game.getWidth());
        }

        if (transform.position.y > game.getHeight()) {
            transform.position.setY(0);
        }
        else if ((transform.position.y + transform.dimensions.y) < 0) {
            transform.position.setY(game.getHeight());
        }

        // enemy respawing
        if (game.entityManager.countEntities() === 1) {
            (enemy.getComponentByName('Transform') as Transform).position = randomPosition(game);
            game.entityManager.addEntity(enemy);
        }

        if (game.getData('points') as number === 10) {
            game.switchToState('win');
        }
    }
});
