import { Color, Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

/**
 * Enemy Entity for the Game, composed of FlatColor, Transform and AABBCollisionBox Components
 */
export const enemy = new Entity.Entity({
    tag: 'enemy',
    components: [
        new Component.FlatColor(new Color(255, 0, 0, 0.5)),
        new Component.Transform(new Vec2(), new Vec2(25, 25)),

        new Component.Model(new Geometry.TwoD.Triangle()),
        new Component.Shader(Shader.Program.PROGRAM_BASIC.name),

        new Component.AABBCollisionBox(new Vec2(25, 25), (game) => {
            // when we collide, it'll be with the player; remove this Entity from the game
            game.entityManager.removeEntity(enemy);
        })
    ]
});
