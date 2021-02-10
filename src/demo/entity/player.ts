import { Entity, Geometry, Math, Screen } from '../../engine';

/**
 * Player Entity for the Game, composed of FlatColor, Transform and AABBCollisionBox Components
 */
export const player = new Entity.Entity({
    tag: 'player',
    components: [
        new Entity.Component.FlatColor(),
        new Entity.Component.Transform(new Math.Vec2(100, 100), new Math.Vec2(50, 50)),

        new Entity.Component.Model(new Geometry.Triangle()),
        new Entity.Component.Shader(Screen.Shader.ShaderPrograms.PROGRAM_BASIC.name),

        new Entity.Component.AABBCollisionBox(new Math.Vec2(50, 50), (game) => {
            // when we collide, it'll be with an enemy; update the Game's points data
            game.setData('points', game.getData<number>('points') + 1);
        })
    ]
});
