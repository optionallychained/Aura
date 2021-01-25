import { CollisionSystem, Game, State, Keys, MathUtils, PhysicsSystem, Transform, Vec2 } from '../../engine/protogl';
import { enemy } from '../entity/enemy';
import { player } from '../entity/player';

/** internal module utility for producing a new random position for the Enemy when required */
const randomPosition = (game: Game): Vec2 => {
    return new Vec2(MathUtils.randomBetween(50, game.getWidth() - 50), MathUtils.randomBetween(50, game.getHeight() - 50))
}

/**
 * 'main' State for the Game, implementing the Game's playable state
 */
export const mainState = new State({
    name: 'main',
    // init; set up the State when transitioned to
    init: (game) => {
        const { entityManager } = game;

        // add some data to the Game to track the player's points
        game.setData('points', 0);

        // add the Physics and Collision Systems to the Game to enable behaviours
        game.addSystems(new PhysicsSystem(), new CollisionSystem());

        // randomly set the enemy's position
        enemy.getComponent<Transform>('Transform').position = randomPosition(game);

        // add the player and enemy to the Game
        entityManager.addEntities(player, enemy);
    },
    // end; clean up the State and the Game before transitioning to a new State
    end: (game) => {
        // reset the player's position and velocity
        const playerTransform = player.getComponent<Transform>('Transform');
        playerTransform.position.set(100, 100);
        playerTransform.velocity.set();

        // remove the Physics and Collision systems from the game
        game.removeSystems('Physics', 'Collision')

        // remove all Entities from the Game
        game.entityManager.clearEntities();
    },
    // tick; execute per-frame State behaviour
    tick: (game) => {
        const { entityManager, inputManager } = game;

        // render the player's points to the screen
        game.renderText(`Points: ${game.getData<number>('points') ?? 0}`);

        // kind of dirty method of retrieving and operating on the player; to be improved
        const player = entityManager.filterEntitiesByTag('player')[0];
        if (!player) {
            return;
        }

        // retrieve the player's Transform Component
        const transform = player.getComponent<Transform>('Transform');

        // implement player movement based on user input
        if (inputManager.isKeyDown(Keys.A)) {
            transform.velocity.set(-500, 0);
        }
        else if (inputManager.isKeyDown(Keys.D)) {
            transform.velocity.set(500, 0);
        }
        else if (inputManager.isKeyDown(Keys.W)) {
            transform.velocity.set(0, -500);
        }
        else if (inputManager.isKeyDown(Keys.S)) {
            transform.velocity.set(0, 500);
        }
        else if (inputManager.isKeyDown(Keys.SPACE)) {
            transform.velocity.set();
        }

        // wrap the player's position at screen edges
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

        // handle enemy respawns
        if (entityManager.countEntities() === 1) {
            enemy.getComponent<Transform>('Transform').position = randomPosition(game);
            entityManager.addEntity(enemy);
        }

        // handle transitioning to the 'win' State when the player gets 10 points
        if (game.getData<number>('points') === 10) {
            game.switchToState('win');
        }
    }
});
