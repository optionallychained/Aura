import { CameraBase } from './camera/camera.base';

import { FlatColor } from './component/generic/flatColor.component';
import { Model } from './component/generic/model.component';
import { MultiColor } from './component/generic/multiColor.component';
import { Shader } from './component/generic/shader.component';
import { Texture } from './component/generic/texture.component';

import { Component } from './component/component.decorator';

import { AuraError } from './core/aura.error';
import { GameBase } from './core/game.base';
import { GameConfigBase } from './core/game.config.base';
import { GameConfigDefaults } from './core/game.config.base';

import { EntityConfig } from './entity/entity.config';
import { EntityManagerConfig } from './entity/entity.manager.config';
import { EntityManager } from './entity/entity.manager';
import { Entity } from './entity/entity';

import { GeometryConfig } from './geometry/geometry.config';
import { Geometry } from './geometry/geometry';
import { GLShape } from './geometry/glShape.enum';

import { ControlScheme } from './input/controlScheme.type';
import { InputManager } from './input/input.manager';
import { Keys } from './input/keys.enum';

import { Angle } from './math/angle';
import { Color } from './math/color';
import { Mat3 } from './math/mat3';
import { Mat4 } from './math/mat4';
import { Random } from './math/random';
import { Vec2 } from './math/vec2';
import { Vec3 } from './math/vec3';
import { Vec4 } from './math/vec4';

import { RendererConfig } from './renderer/renderer.config';
import { Renderer } from './renderer/renderer';
import { VBOConfig } from './renderer/vbo.config';

import { AttributeArray } from './shader/attributeArray.type';
import { ShaderVariableResolver } from './shader/resolve/shaderVariableResolver';
import { UniformArray } from './shader/uniformArray.type';
import { UniformType } from './shader/uniformType.enum';
import { UniformVariation } from './shader/uniformVariation.enum';
import { FragmentShaderConfig } from './shader/fragment/fragment.shader.config';
import { FragmentShader } from './shader/fragment/fragment.shader';
import { ShaderProgramConfig } from './shader/program/shaderProgram.config';
import { ShaderProgram } from './shader/program/shaderProgram';
import { VertexShaderConfig } from './shader/vertex/vertex.shader.config';
import { VertexShader } from './shader/vertex/vertex.shader';

import { StateBase } from './state/state.base';
import { StateConfig } from './state/state.config';

import { SystemBase } from './system/system.base';

import { TextManager } from './text/text.manager';

import { TextureAtlas } from './texture/textureAtlas';

import { UIManager } from './ui/ui.manager';

import { WorldManager } from './world/world.manager';

export {
    CameraBase,
    FlatColor,
    Model,
    MultiColor,
    Shader,
    Texture,
    Component,
    AuraError,
    GameBase,
    GameConfigBase,
    GameConfigDefaults,
    EntityConfig,
    EntityManagerConfig,
    EntityManager,
    Entity,
    GeometryConfig,
    Geometry,
    GLShape,
    ControlScheme,
    InputManager,
    Keys,
    Angle,
    Color,
    Mat3,
    Mat4,
    Random,
    Vec2,
    Vec3,
    Vec4,
    RendererConfig,
    Renderer,
    VBOConfig,
    AttributeArray,
    ShaderVariableResolver,
    UniformArray,
    UniformType,
    UniformVariation,
    FragmentShaderConfig,
    FragmentShader,
    ShaderProgramConfig,
    ShaderProgram,
    VertexShaderConfig,
    VertexShader,
    StateBase,
    StateConfig,
    SystemBase,
    TextManager,
    TextureAtlas,
    UIManager,
    WorldManager
}
