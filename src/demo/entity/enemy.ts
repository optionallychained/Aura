import { AABBCollisionBox, Color, Entity, FlatColor, Geometry, Model, Shader, ShaderPrograms, Transform, Vec2 } from '../../engine/protogl';

/**
 * Enemy Entity for the Game, composed of FlatColor, Transform and AABBCollisionBox Components
 */
export const enemy = new Entity({
    tag: 'enemy',
    components: [
        new FlatColor(new Color(255, 0, 0)),
        new Transform(new Vec2(), new Vec2(25, 25)),

        new Model(new Geometry.Triangle()),
        new Shader(ShaderPrograms.PROGRAM_BASIC.name),

        new AABBCollisionBox(new Vec2(25, 25), (game) => {
            // when we collide, it'll be with the player; remove this Entity from the game
            game.entityManager.removeEntity(enemy);
        })
    ]
});
