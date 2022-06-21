import { Game, Vec2 } from '../aura/aura.2d';
import { SHAPES_STATE } from './state/shapes.state';

const game = new Game({
    canvas: {
        // id: 'target',
        // parentId: 'parent',
        // dimensions: new Vec2(1024, 768)
    },
    states: [SHAPES_STATE]
});

game.start(SHAPES_STATE.name);
