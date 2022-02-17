import { Camera3DConfig as CameraConfig } from './camera/3d/camera.3d.config';
import { Camera3D as Camera } from './camera/3d/camera.3d';

import { Transform3D as Transform } from './component/3d/transform.component.3d';

import { Game3DConfig as GameConfig } from './core/3d/game.3d.config';
import { Game3D as Game } from './core/3d/game.3d';

import { CUBE } from './geometry/3d/cube.geometry.3d';
import { F } from './geometry/3d/f.geometry.3d';
import { LINE } from './geometry/3d/line.geometry.3d';
import { OCTAHEDRON } from './geometry/3d/octahedron.geometry.3d';
import { POINT } from './geometry/3d/point.geometry.3d';
import { PRISM_HEXAGONAL } from './geometry/3d/prismHexagonal.geometry.3d';
import { PRISM_TRIANGULAR } from './geometry/3d/prismTriangular.geometry.3d';
import { PYRAMID_HEXAGONAL } from './geometry/3d/pyramidHexagonal.geometry.3d';
import { PYRAMID_SQUARE } from './geometry/3d/pyramidSquare.geometry.3d';
import { TETRAHEDRON } from './geometry/3d/tetrahedron.geometry.3d';
import { CUBE_WIREFRAME } from './geometry/3d/wireframe/cube.wireframe.geometry.3d';
import { F_WIREFRAME } from './geometry/3d/wireframe/f.wireframe.geometry.3d';
import { OCTAHEDRON_WIREFRAME } from './geometry/3d/wireframe/octahedron.wireframe.geometry.3d';
import { PRISM_HEXAGONAL_WIREFRAME } from './geometry/3d/wireframe/prismHexagonal.wireframe.geometry';
import { PRISM_TRIANGULAR_WIREFRAME } from './geometry/3d/wireframe/prismTriangular.wireframe.geometry.3d';
import { PYRAMID_HEXAGONAL_WIREFRAME } from './geometry/3d/wireframe/pyramidHexagonal.wireframe.geometry.3d';
import { PYRAMID_SQUARE_WIREFRAME } from './geometry/3d/wireframe/pyramidSquare.wireframe.geometry.3d';
import { TETRAHEDRON_WIREFRAME } from './geometry/3d/wireframe/tetrahedron.wireframe.geometry.3d';

import { FRAGMENT_BASIC } from './shader/fragment/generic/basic.fragment.generic';
import { FRAGMENT_COLOR_PER_VERTEX } from './shader/fragment/generic/colorPerVertex.fragment.generic';
import { FRAGMENT_TEXTURE } from './shader/fragment/generic/texture.fragment.generic';
import { FRAGMENT_TEXTURE_COLORED } from './shader/fragment/generic/textureColored.fragment.generic';
import { PROGRAM_BASIC_3D } from './shader/program/3d/basic.program.3d';
import { PROGRAM_COLOR_PER_VERTEX_3D } from './shader/program/3d/colorPerVertex.program.3d';
import { PROGRAM_TEXTURE_3D } from './shader/program/3d/texture.program.3d';
import { PROGRAM_TEXTURE_COLORED_3D } from './shader/program/3d/textureColored.program.3d';
import { VERTEX_BASIC_3D } from './shader/vertex/3d/basic.vertex.3d';
import { VERTEX_COLOR_PER_VERTEX_3D } from './shader/vertex/3d/colorPerVertex.vertex.3d';
import { VERTEX_TEXTURE_3D } from './shader/vertex/3d/texture.vertex.3d';

import { State3D as State } from './state/3d/state.3d';

import { Physics } from './system/3d/physics.system.3d';
import { System3D as System } from './system/3d/system.3d';

import { Panel3D as Panel } from './ui/3d/panel.3d';

import { World3D as World } from './world/3d/world.3d';

export * from './index.core';
export * from './types';

export {
    CameraConfig,
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
    BASIC: PROGRAM_BASIC_3D,
    COLOR_PER_VERTEX: PROGRAM_COLOR_PER_VERTEX_3D,
    TEXTURE: PROGRAM_TEXTURE_3D,
    TEXTURE_COLORED: PROGRAM_TEXTURE_COLORED_3D
};

export const VertexShaders = {
    BASIC: VERTEX_BASIC_3D,
    COLOR_PER_VERTEX: VERTEX_COLOR_PER_VERTEX_3D,
    TEXTURE: VERTEX_TEXTURE_3D
};
