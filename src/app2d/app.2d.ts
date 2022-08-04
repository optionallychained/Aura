import { Game, Vec2 } from '../aura/aura.2d';
import { SHAPES_STATE } from './state/shapes.state';

const game = new Game({
    canvas: {
        // id: 'target',
        // parentId: 'parent',
        // dimensions: new Vec2(1024, 768)
    },
    world: {
        // dimensions: new Vec2(1024 * 2, 768 * 2)
        dimensions: new Vec2(1000, 1000)
    },
    states: [SHAPES_STATE]
});

game.start(SHAPES_STATE.name);
