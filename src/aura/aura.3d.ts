import { CameraConfig, CameraFollow, CameraFollowRules } from './camera/3d/camera.config';
import { Camera } from './camera/3d/camera';

import { Transform } from './component/3d/transform.component';

import { GameConfig } from './core/3d/game.config';
import { Game } from './core/3d/game';

import { CUBE } from './geometry/3d/cube.geometry';
import { F } from './geometry/3d/f.geometry';
import { LINE } from './geometry/3d/line.geometry';
import { OCTAHEDRON } from './geometry/3d/octahedron.geometry';
import { POINT } from './geometry/3d/point.geometry';
import { PRISM_HEXAGONAL } from './geometry/3d/prismHexagonal.geometry';
import { PRISM_TRIANGULAR } from './geometry/3d/prismTriangular.geometry';
import { PYRAMID_HEXAGONAL } from './geometry/3d/pyramidHexagonal.geometry';
import { PYRAMID_SQUARE } from './geometry/3d/pyramidSquare.geometry';
import { TETRAHEDRON } from './geometry/3d/tetrahedron.geometry';
import { CUBE_WIREFRAME } from './geometry/3d/wireframe/cube.wireframe.geometry';
import { F_WIREFRAME } from './geometry/3d/wireframe/f.wireframe.geometry';
import { OCTAHEDRON_WIREFRAME } from './geometry/3d/wireframe/octahedron.wireframe.geometry';
import { PRISM_HEXAGONAL_WIREFRAME } from './geometry/3d/wireframe/prismHexagonal.wireframe.geomery';
import { PRISM_TRIANGULAR_WIREFRAME } from './geometry/3d/wireframe/prismTriangular.wireframe.geometry';
import { PYRAMID_HEXAGONAL_WIREFRAME } from './geometry/3d/wireframe/pyramidHexagonal.wireframe.geometry';
import { PYRAMID_SQUARE_WIREFRAME } from './geometry/3d/wireframe/pyramidSquare.wireframe.geometry';
import { TETRAHEDRON_WIREFRAME } from './geometry/3d/wireframe/tetrahedron.wireframe.geometry';

import { FRAGMENT_BASIC } from './shader/fragment/generic/basic.fragment';
import { FRAGMENT_COLOR_PER_VERTEX } from './shader/fragment/generic/colorPerVertex.fragment';
import { FRAGMENT_TEXTURE } from './shader/fragment/generic/texture.fragment';
import { FRAGMENT_TEXTURE_COLORED } from './shader/fragment/generic/textureColored.fragment';
import { PROGRAM_BASIC } from './shader/program/3d/basic.program';
import { PROGRAM_COLOR_PER_VERTEX } from './shader/program/3d/colorPerVertex.program';
import { PROGRAM_TEXTURE } from './shader/program/3d/texture.program';
import { PROGRAM_TEXTURE_COLORED } from './shader/program/3d/textureColored.program';
import { VERTEX_BASIC } from './shader/vertex/3d/basic.vertex';
import { VERTEX_COLOR_PER_VERTEX } from './shader/vertex/3d/colorPerVertex.vertex';
import { VERTEX_TEXTURE } from './shader/vertex/3d/texture.vertex';

import { State } from './state/3d/state';

import { Physics } from './system/3d/physics.system';
import { System } from './system/3d/system';

import { Panel } from './ui/3d/panel';

import { World } from './world/3d/world';

export * from './aura.core';
export * from './aura.types';

export {
    CameraConfig,
    CameraFollow,
    CameraFollowRules,
    Camera,
    Transform,
    GameConfig,
    Game,
    State,
    Physics,
    System,
    Panel,
    World
};

export const Geometries = {
    CUBE,
    F,
    LINE,
    OCTAHEDRON,
    POINT,
    PRISM_HEXAGONAL,
    PRISM_TRIANGULAR,
    PYRAMID_HEXAGONAL,
    PYRAMID_SQUARE,
    TETRAHEDRON,
    Wireframe: {
        CUBE: CUBE_WIREFRAME,
        F: F_WIREFRAME,
        OCTAHEDRON: OCTAHEDRON_WIREFRAME,
        PRISM_HEXAGONAL: PRISM_HEXAGONAL_WIREFRAME,
        PRISM_TRIANGULAR: PRISM_TRIANGULAR_WIREFRAME,
        PYRAMID_HEXAGONAL: PYRAMID_HEXAGONAL_WIREFRAME,
        PYRAMID_SQUARE: PYRAMID_SQUARE_WIREFRAME,
        TETRAHEDRON: TETRAHEDRON_WIREFRAME
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
