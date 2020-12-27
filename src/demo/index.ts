import { Keys } from '@protogl/input/keys';
import { Vec2 } from '@protogl/math/vec2';
import { Vec3 } from '@protogl/math/vec3';
import { FlatColor } from '@protogl/entity/component/flatColor';
import { Transform } from '@protogl/entity/component/transform';
import { Entity } from '@protogl/entity/entity';
import { ProtoGL } from '@protogl/protogl';
import { GameState } from '@protogl/state/gameState';
import { PhysicsSystem } from '@protogl/system/physicsSystem';
import { AABBCollisionBox } from '@protogl/entity/component/AABBCollisionBox';
import { CollisionSystem } from '@protogl/system/collisionSystem';
import { MathUtils } from '@protogl/math/mathUtils';

const game = new ProtoGL({
    width: 800,
    height: 600,
    background: new Vec3(),
    initFunc: (): void => { console.log('GAME -> init') }
});

// reusable enemy Entity
const enemy = new Entity({
    tag: 'enemy-1',
    onUpdate: (): void => { },
    components: [
        new FlatColor(new Vec3(255, 0, 0)),
        new Transform(new Vec2(500, 500), new Vec2(25, 25)),
        new AABBCollisionBox(new Vec2(50, 50), (e: Entity): void => {
            game.entityManager.removeEntity(enemy);
        })
    ]
});

// stupid global :)
let points = 0;

game.addState(new GameState({
    name: 'state-1',
    initFunc: (): void => {
        console.log('state-1 -> init');

        game.addSystem(new PhysicsSystem(game));
        game.addSystem(new CollisionSystem(game));

        game.entityManager.clearEntities();

        game.entityManager.addEntity(new Entity({
            tag: 'Player-1',
            onUpdate: (): void => { },
            components: [
                new FlatColor(),
                new Transform(new Vec2(100, 100), new Vec2(50, 50)),
                new AABBCollisionBox(new Vec2(50, 50), (e: Entity): void => {
                    points++;
                })
            ]
        }));

        game.entityManager.addEntity(enemy);
    },
    tickFunc: (): void => {
        game.renderText(`Points: ${points}`);

        // super dutty
        const player = game.entityManager.filterEntitiesByTag('Player-1')[0];
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
            (enemy.getComponentByName('Transform') as Transform).position.set(MathUtils.randomBetween(50, game.getWidth() - 50), MathUtils.randomBetween(50, game.getHeight() - 50));
            game.entityManager.addEntity(enemy);
        }
    }
}));

game.start('state-1');
