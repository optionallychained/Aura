export * from './core/game.config'
export * from './core/game';

export * from './entity/entity.config';
export * from './entity/entity.manager';
export * from './entity/entity';
export * from './entity/component/AABBCollisionBox.component';
export * from './entity/component/component';
export * from './entity/component/flatColor.component';
export * from './entity/component/model.component';
export * from './entity/component/shader.component';
export * from './entity/component/transform.component';

// group geometry under a name to act like a package
// do not export internals Geometry and GLShape?
// TODO check efficiency/actual utility of this pattern
// TODO check whether or not we actually wanna export internals
import { Triangle } from './geometry/triangle.geometry';
export const Geometry = {
    Triangle
};

export * from './input/input.manager';
export * from './input/keys';

export * from './math/angle';
export * from './math/color';
export * from './math/mat3';
export * from './math/mat4';
export * from './math/random';
export * from './math/vec2';
export * from './math/vec3';
export * from './math/vec4';

export * from './screen/webgl.renderer.config';
export * from './screen/webgl.renderer';

// group fragment shaders under a name to act like a package
// TODO check efficiency/actual utility of this pattern
// TODO check whether or not we actually wanna export internals (ShaderProgram)
import { FRAGMENT_BASIC } from './screen/shaders/fragment/fragment.basic';
export const FragmentShaders = {
    FRAGMENT_BASIC
};

// group Vertex shaders under a name to act like a package
// TODO check efficiency/actual utility of this pattern
// TODO check whether or not we actually wanna export internals (ShaderProgram)
import { VERTEX_BASIC } from './screen/shaders/vertex/vertex.basic';
export const VertexShaders = {
    VERTEX_BASIC
};

export * from './state/state.config';
export * from './state/state';

export * from './system/collision.system';
export * from './system/physics.system';
export * from './system/system';
