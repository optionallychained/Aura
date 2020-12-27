import { AABBCollisionBox } from '@protogl/entity/component/AABBCollisionBox';
import { FlatColor } from '@protogl/entity/component/flatColor';
import { Transform } from '@protogl/entity/component/transform';
import { Entity } from '@protogl/entity/entity';
import { Keys } from '@protogl/input/keys';
import { MathUtils } from '@protogl/math/mathUtils';
import { Vec2 } from '@protogl/math/vec2';
import { Vec3 } from '@protogl/math/vec3';
import { ProtoGL } from '@protogl/protogl';
import { GameState } from '@protogl/state/gameState';
import { CollisionSystem } from '@protogl/system/collisionSystem';
import { PhysicsSystem } from '@protogl/system/physicsSystem';

// TODO super dumb (see AABBCollisionBox below)
let globalGame: ProtoGL;

const randomPosition = (): Vec2 => {
    return new Vec2(MathUtils.randomBetween(50, globalGame.getWidth() - 50), MathUtils.randomBetween(50, globalGame.getHeight() - 50))
}

const enemy = new Entity({
    tag: 'enemy',
    onUpdate: () => { },
    components: [
        new FlatColor(new Vec3(255, 0, 0)),
        new Transform(new Vec2(), new Vec2(25, 25)),
        new AABBCollisionBox(new Vec2(50, 50), (e: Entity) => {
            // TODO: real solution to enabling this type of thing
            globalGame.entityManager.removeEntity(enemy);
        })
    ]
});

export const mainState = new GameState({
    name: 'main',
    initFunc: (game: ProtoGL) => {
        globalGame = game;

        game.setData('points', 0);

        game.addSystem(new PhysicsSystem(game));
        game.addSystem(new CollisionSystem(game));

        game.entityManager.clearEntities();

        game.entityManager.addEntity(new Entity({
            tag: 'player',
            onUpdate: () => { },
            components: [
                new FlatColor(),
                new Transform(new Vec2(100, 100), new Vec2(50, 50)),
                new AABBCollisionBox(new Vec2(50, 50), (e: Entity) => {
                    game.setData('points', game.getData('points') as number + 1);
                })
            ]
        }));

        game.entityManager.addEntity(enemy);

        (enemy.getComponentByName('Transform') as Transform).position = randomPosition();
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
            (enemy.getComponentByName('Transform') as Transform).position = randomPosition();
            game.entityManager.addEntity(enemy);
        }

        if (game.getData('points') as number === 10) {
            game.switchToState('win');
        }
    }
});
