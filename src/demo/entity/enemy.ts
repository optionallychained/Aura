import { Entity, Geometry, Math, Screen } from '../../engine';

/**
 * Enemy Entity for the Game, composed of FlatColor, Transform and AABBCollisionBox Components
 */
export const enemy = new Entity.Entity({
    tag: 'enemy',
    components: [
        new Entity.Component.FlatColor(new Math.Color(255, 0, 0)),
        new Entity.Component.Transform(new Math.Vec2(), new Math.Vec2(25, 25)),

        new Entity.Component.Model(new Geometry.Triangle()),
        new Entity.Component.Shader(Screen.Shader.ShaderPrograms.PROGRAM_BASIC.name),

        new Entity.Component.AABBCollisionBox(new Math.Vec2(25, 25), (game) => {
            // when we collide, it'll be with the player; remove this Entity from the game
            game.entityManager.removeEntity(enemy);
        })
    ]
});
