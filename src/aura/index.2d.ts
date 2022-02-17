import { Camera2DConfig as CameraConfig } from './camera/2d/camera.2d.config';
import { Camera2D as Camera } from './camera/2d/camera.2d';

import { BoxCollider2D as BoxCollider } from './component/2d/boxCollider.component.2d';
import { Transform2D as Transform } from './component/2d/transform.component.2d';

import { Game2DConfig as GameConfig } from './core/2d/game.2d.config';
import { Game2D as Game } from './core/2d/game.2d';

import { CIRCLE } from './geometry/2d/circle.geometry.2d';
import { F } from './geometry/2d/f.geometry.2d';
import { HEXAGON } from './geometry/2d/hexagon.geometry.2d';
import { LINE } from './geometry/2d/line.geometry.2d';
import { OCTAGON } from './geometry/2d/octagon.geometry.2d';
import { PENTAGON } from './geometry/2d/pentagon.geometry.2d';
import { POINT } from './geometry/2d/point.geometry.2d';
import { POLYGON } from './geometry/2d/polygon.geometry.2d';
import { SQUARE } from './geometry/2d/square.geometry.2d';
import { TRIANGLE } from './geometry/2d/triangle.geometry.2d';
import { TRIANGLE_RIGHT_ANGLE } from './geometry/2d/triangleright.geometry.2d';
import { CIRCLE_WIREFRAME } from './geometry/2d/wireframe/circle.wireframe.geometry.2d';
import { F_WIREFRAME } from './geometry/2d/wireframe/f.wireframe.geometry.2d';
import { HEXAGON_WIREFRAME } from './geometry/2d/wireframe/hexagon.wireframe.geometry.2d';
import { OCTAGON_WIREFRAME } from './geometry/2d/wireframe/octagon.wireframe.geometry.2d';
import { PENTAGON_WIREFRAME } from './geometry/2d/wireframe/pentagon.wireframe.geometry.2d';
import { POLYGON_WIREFRAME } from './geometry/2d/wireframe/polygon.wireframe.geometry.2d';
import { SQUARE_WIREFRAME } from './geometry/2d/wireframe/square.wireframe.geometry.2d';
import { TRIANGLE_WIREFRAME } from './geometry/2d/wireframe/triangle.wireframe.geometry.2d';
import { TRIANGLE_RIGHT_ANGLE_WIREFRAME } from './geometry/2d/wireframe/triangleright.wireframe.geometry.2d';

import { FRAGMENT_BASIC } from './shader/fragment/generic/basic.fragment.generic';
import { FRAGMENT_COLOR_PER_VERTEX } from './shader/fragment/generic/colorPerVertex.fragment.generic';
import { FRAGMENT_TEXTURE } from './shader/fragment/generic/texture.fragment.generic';
import { FRAGMENT_TEXTURE_COLORED } from './shader/fragment/generic/textureColored.fragment.generic';
import { PROGRAM_BASIC_2D } from './shader/program/2d/basic.program.2d';
import { PROGRAM_COLOR_PER_VERTEX_2D } from './shader/program/2d/colorPerVertex.program.2d';
import { PROGRAM_TEXTURE_2D } from './shader/program/2d/texture.program.2d';
import { PROGRAM_TEXTURE_COLORED_2D } from './shader/program/2d/textureColored.program.2d';
import { VERTEX_BASIC_2D } from './shader/vertex/2d/basic.vertex.2d';
import { VERTEX_COLOR_PER_VERTEX_2D } from './shader/vertex/2d/colorPerVertex.vertex.2d';
import { VERTEX_TEXTURE_2D } from './shader/vertex/2d/texture.vertex.2d';

import { State2D as State } from './state/2d/state.2d';

import { Collision } from './system/2d/collision.system.2d';
import { Physics } from './system/2d/physics.system.2d';
import { System2D as System } from './system/2d/system.2d';

import { Panel2D as Panel } from './ui/2d/panel.2d';

import { World2D as World } from './world/2d/world.2d';

export * from './index.core';
export * from './types';

export {
    CameraConfig,
    Camera,
    BoxCollider,
    Transform,
    GameConfig,
    Game,
    State,
    Collision,
    Physics,
    System,
    Panel,
    World
};

export const Geometries = {
    CIRCLE,
    F,
    HEXAGON,
    LINE,
    OCTAGON,
    PENTAGON,
    POINT,
    POLYGON,
    SQUARE,
    TRIANGLE,
    TRIANGLE_RIGHT_ANGLE,
    Wireframe: {
        CIRCLE: CIRCLE_WIREFRAME,
        F: F_WIREFRAME,
        HEXAGON: HEXAGON_WIREFRAME,
        OCTAGON: OCTAGON_WIREFRAME,
        PENTAGON: PENTAGON_WIREFRAME,
        POLYGON: POLYGON_WIREFRAME,
        SQUARE: SQUARE_WIREFRAME,
        TRIANGLE: TRIANGLE_WIREFRAME,
        TRIANGLE_RIGHT_ANGLE: TRIANGLE_RIGHT_ANGLE_WIREFRAME
    }
};

export const FragmentShaders = {
    BASIC: FRAGMENT_BASIC,
    COLOR_PER_VERTEX: FRAGMENT_COLOR_PER_VERTEX,
    TEXTURE: FRAGMENT_TEXTURE,
    TEXTURE_COLORED: FRAGMENT_TEXTURE_COLORED,
};

export const ShaderPrograms = {
    BASIC: PROGRAM_BASIC_2D,
    COLOR_PER_VERTEX: PROGRAM_COLOR_PER_VERTEX_2D,
    TEXTURE: PROGRAM_TEXTURE_2D,
    TEXTURE_COLORED: PROGRAM_TEXTURE_COLORED_2D
};

export const VertexShaders = {
    BASIC: VERTEX_BASIC_2D,
    COLOR_PER_VERTEX: VERTEX_COLOR_PER_VERTEX_2D,
    TEXTURE: VERTEX_TEXTURE_2D
};
