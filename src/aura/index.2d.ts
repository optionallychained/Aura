import { Camera2DConfig as CameraConfig } from './camera/2d/camera.2d.config';
import { Camera2D as Camera } from './camera/2d/camera.2d';

import { Component } from './component/component';
import { BoxCollider2D as BoxCollider } from './component/2d/boxCollider.component.2d';
import { Transform2D as Transform } from './component/2d/transform.component.2d';
import { FlatColor } from './component/generic/flatColor.component';
import { Model } from './component/generic/model.component';
import { MultiColor } from './component/generic/multiColor.component';
import { Shader } from './component/generic/shader.component';
import { Texture } from './component/generic/texture.component';

import { Game2DConfig as GameConfig } from './core/2d/game.2d.config';
import { Game2D as Game } from './core/2d/game.2d';

import { EntityConfig } from './entity/entity.config';
import { Entity } from './entity/entity';

import { GeometryConfig } from './geometry/geometry.config';
import { Geometry } from './geometry/geometry';
import { GLShape } from './geometry/glShape.enum';
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

import { Keys } from './input/keys.enum';

import { Angle } from './math/angle';
import { Color } from './math/color';
import { Mat3 } from './math/mat3';
import { Mat4 } from './math/mat4';
import { Random } from './math/random';
import { Vec2 } from './math/vec2';
import { Vec3 } from './math/vec3';
import { Vec4 } from './math/vec4';

import { UniformArray } from './shader/uniformArray.type';
import { UniformType } from './shader/uniformType.enum';
import { UniformVariation } from './shader/uniformVariation.enum';
import { FragmentShaderConfig } from './shader/fragment/fragment.shader.config';
import { FragmentShader } from './shader/fragment/fragment.shader';
import { FRAGMENT_BASIC } from './shader/fragment/generic/basic.fragment.generic';
import { FRAGMENT_COLOR_PER_VERTEX } from './shader/fragment/generic/colorPerVertex.fragment.generic';
import { FRAGMENT_TEXTURE } from './shader/fragment/generic/texture.fragment.generic';
import { FRAGMENT_TEXTURE_COLORED } from './shader/fragment/generic/textureColored.fragment.generic';
import { ShaderProgramConfig } from './shader/program/shaderProgram.config';
import { ShaderProgram } from './shader/program/shaderProgram';
import { PROGRAM_BASIC_2D } from './shader/program/2d/basic.program.2d';
import { PROGRAM_COLOR_PER_VERTEX_2D } from './shader/program/2d/colorPerVertex.program.2d';
import { PROGRAM_TEXTURE_2D } from './shader/program/2d/texture.program.2d';
import { PROGRAM_TEXTURE_COLORED_2D } from './shader/program/2d/textureColored.program.2d';
import { VertexShaderConfig } from './shader/vertex/vertex.shader.config';
import { VertexShader } from './shader/vertex/vertex.shader';
import { VERTEX_BASIC_2D } from './shader/vertex/2d/basic.vertex.2d';
import { VERTEX_COLOR_PER_VERTEX_2D } from './shader/vertex/2d/colorPerVertex.vertex.2d';
import { VERTEX_TEXTURE_2D } from './shader/vertex/2d/texture.vertex.2d';

import { StateConfig } from './state/state.config';
import { State2D as State } from './state/2d/state.2d';

import { Collision } from './system/2d/collision.system.2d';
import { Physics } from './system/2d/physics.system.2d';
import { System2D as System } from './system/2d/system.2d';

import { TextureAtlas } from './texture/textureAtlas';

import { Panel2D as Panel } from './ui/2d/panel.2d';

import { World2D as World } from './world/2d/world.2d';

export {
    CameraConfig,
    Camera,
    Component,
    BoxCollider,
    Transform,
    FlatColor,
    Model,
    MultiColor,
    Shader,
    Texture,
    GameConfig,
    Game,
    EntityConfig,
    Entity,
    GeometryConfig,
    Geometry,
    GLShape,
    Keys,
    Angle,
    Color,
    Mat3,
    Mat4,
    Random,
    Vec2,
    Vec3,
    Vec4,
    UniformArray,
    UniformType,
    UniformVariation,
    FragmentShaderConfig,
    FragmentShader,
    ShaderProgramConfig,
    ShaderProgram,
    VertexShaderConfig,
    VertexShader,
    StateConfig,
    State,
    Collision,
    Physics,
    System,
    TextureAtlas,
    Panel,
    World
};

export * from './types';

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
    CIRCLE_WIREFRAME,
    F_WIREFRAME,
    HEXAGON_WIREFRAME,
    OCTAGON_WIREFRAME,
    PENTAGON_WIREFRAME,
    POLYGON_WIREFRAME,
    SQUARE_WIREFRAME,
    TRIANGLE_WIREFRAME,
    TRIANGLE_RIGHT_ANGLE_WIREFRAME
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
