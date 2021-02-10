import { Component, Entity, Geometry, Shader, Vec2 } from '../../engine';

/**
 * Player Entity for the Game, composed of FlatColor, Transform and AABBCollisionBox Components
 */
export const player = new Entity.Entity({
    tag: 'player',
    components: [
        new Component.FlatColor(),
        new Component.Transform(new Vec2(100, 100), new Vec2(50, 50)),

        new Component.Model(new Geometry.Triangle()),
        new Component.Shader(Shader.Program.PROGRAM_BASIC.name),

        new Component.AABBCollisionBox(new Vec2(50, 50), (game) => {
            // when we collide, it'll be with an enemy; update the Game's points data
            game.setData('points', game.getData<number>('points') + 1);
        })
    ]
});
