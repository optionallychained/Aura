import { CameraConfig, CameraFollow, CameraFollowRules } from './camera/2d/camera.config';
import { Camera } from './camera/2d/camera';

import { BoxCollider } from './component/2d/boxCollider.component';
import { Transform } from './component/2d/transform.component';

import { GameConfig } from './core/2d/game.config';
import { Game } from './core/2d/game';

import { CIRCLE } from './geometry/2d/circle.geometry';
import { F } from './geometry/2d/f.geometry';
import { HEXAGON } from './geometry/2d/hexagon.geometry';
import { LINE } from './geometry/2d/line.geometry';
import { OCTAGON } from './geometry/2d/octagon.geometry';
import { PENTAGON } from './geometry/2d/pentagon.geometry';
import { POINT } from './geometry/2d/point.geometry';
import { POLYGON } from './geometry/2d/polygon.geometry';
import { SQUARE } from './geometry/2d/square.geometry';
import { TRIANGLE } from './geometry/2d/triangle.geometry';
import { TRIANGLE_RIGHT_ANGLE } from './geometry/2d/triangleright.geometry';
import { CIRCLE_WIREFRAME } from './geometry/2d/wireframe/circle.wireframe.geometry';
import { F_WIREFRAME } from './geometry/2d/wireframe/f.wireframe.geometry';
import { HEXAGON_WIREFRAME } from './geometry/2d/wireframe/hexagon.wireframe.geometry';
import { OCTAGON_WIREFRAME } from './geometry/2d/wireframe/octagon.wireframe.geometry';
import { PENTAGON_WIREFRAME } from './geometry/2d/wireframe/pentagon.wireframe.geometry';
import { POLYGON_WIREFRAME } from './geometry/2d/wireframe/polygon.wireframe.geometry';
import { SQUARE_WIREFRAME } from './geometry/2d/wireframe/square.wireframe.geometry';
import { TRIANGLE_WIREFRAME } from './geometry/2d/wireframe/triangle.wireframe.geometry';
import { TRIANGLE_RIGHT_ANGLE_WIREFRAME } from './geometry/2d/wireframe/triangleright.wireframe.geometry';

import { FRAGMENT_BASIC } from './shader/fragment/generic/basic.fragment';
import { FRAGMENT_COLOR_PER_VERTEX } from './shader/fragment/generic/colorPerVertex.fragment';
import { FRAGMENT_TEXTURE } from './shader/fragment/generic/texture.fragment';
import { FRAGMENT_TEXTURE_COLORED } from './shader/fragment/generic/textureColored.fragment';
import { PROGRAM_BASIC } from './shader/program/2d/basic.program';
import { PROGRAM_COLOR_PER_VERTEX } from './shader/program/2d/colorPerVertex.program';
import { PROGRAM_TEXTURE } from './shader/program/2d/texture.program';
import { PROGRAM_TEXTURE_COLORED } from './shader/program/2d/textureColored.program';
import { VERTEX_BASIC } from './shader/vertex/2d/basic.vertex';
import { VERTEX_COLOR_PER_VERTEX } from './shader/vertex/2d/colorPerVertex.vertex';
import { VERTEX_TEXTURE } from './shader/vertex/2d/texture.vertex';

import { State } from './state/2d/state';

import { Collision } from './system/2d/collision.system';
import { Physics } from './system/2d/physics.system';
import { System } from './system/2d/system';

import { Panel } from './ui/2d/panel';

import { World } from './world/2d/world';

export * from './aura.core';
export * from './aura.types';

export {
    CameraConfig,
    CameraFollow,
    CameraFollowRules,
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
    BASIC: PROGRAM_BASIC,
    COLOR_PER_VERTEX: PROGRAM_COLOR_PER_VERTEX,
    TEXTURE: PROGRAM_TEXTURE,
    TEXTURE_COLORED: PROGRAM_TEXTURE_COLORED
};

export const VertexShaders = {
    BASIC: VERTEX_BASIC,
    COLOR_PER_VERTEX: VERTEX_COLOR_PER_VERTEX,
    TEXTURE: VERTEX_TEXTURE
};
