import { AABBCollisionBox, Entity, FlatColor, Game, Transform, Vec2 } from '../../engine/protogl';

/**
 * Player Entity for the Game, composed of FlatColor, Transform and AABBCollisionBox Components
 */
export const player = new Entity({
    tag: 'player',
    components: [
        new FlatColor(),
        new Transform(new Vec2(100, 100), new Vec2(50, 50)),
        new AABBCollisionBox(new Vec2(50, 50), (game: Game) => {
            // when we collide, it'll be with an enemy; update the Game's points data
            game.setData('points', game.getData<number>('points') + 1);
        })
    ]
});
