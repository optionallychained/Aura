import { AABBCollisionBox, CollisionSystem, Game, State, Keys, MathUtils, PhysicsSystem, Transform, Vec2 } from '../../engine/protogl';
import { enemy } from '../entity/enemy';
import { player } from '../entity/player';

const randomPosition = (game: Game): Vec2 => {
    return new Vec2(MathUtils.randomBetween(50, game.getWidth() - 50), MathUtils.randomBetween(50, game.getHeight() - 50))
}

export const mainState = new State({
    name: 'main',
    init: (game: Game) => {
        const { entityManager } = game;

        game.setData('points', 0);

        game.addSystem(new PhysicsSystem());
        game.addSystem(new CollisionSystem());

        entityManager.clearEntities();

        // done here just for game access in collision callback
        // TODO better way of achieving
        player.addComponent(new AABBCollisionBox(new Vec2(50, 50), () => {
            game.setData('points', game.getData<number>('points') + 1);
        }));

        enemy.addComponent(new AABBCollisionBox(new Vec2(50, 50), () => {
            // TODO: real solution to enabling this type of thing
            entityManager.removeEntity(enemy);
        }))

        entityManager.addEntity(player);
        entityManager.addEntity(enemy);

        (enemy.getComponent<Transform>('Transform')).position = randomPosition(game);
    },
    end: () => {
        const playerTransform = player.getComponent<Transform>('Transform');
        playerTransform.position.set(100, 100);
        playerTransform.velocity.set();
    },
    tick: (game: Game) => {
        const { entityManager, inputManager } = game;

        game.renderText(`Points: ${game.getData<number>('points') ?? 0}`);

        // super dutty
        const player = entityManager.filterEntitiesByTag('player')[0];
        if (!player) {
            return;
        }

        const transform = player.getComponent<Transform>('Transform');

        // movement
        if (inputManager.isKeyDown(Keys.A)) {
            transform.velocity.set(-50, 0);
        }
        else if (inputManager.isKeyDown(Keys.D)) {
            transform.velocity.set(50, 0);
        }
        else if (inputManager.isKeyDown(Keys.W)) {
            transform.velocity.set(0, -50);
        }
        else if (inputManager.isKeyDown(Keys.S)) {
            transform.velocity.set(0, 50);
        }
        else if (inputManager.isKeyDown(Keys.SPACE)) {
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
        if (entityManager.countEntities() === 1) {
            enemy.getComponent<Transform>('Transform').position = randomPosition(game);
            entityManager.addEntity(enemy);
        }

        if (game.getData<number>('points') === 10) {
            game.switchToState('win');
        }
    }
});
