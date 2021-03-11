import { Game, ProtoGLError } from '../core';
import { Color, Mat3, Mat4 } from '../math';
import { ShaderVariableResolver, ShaderVariableVariation } from '../shader';
import { ShaderProgram } from '../shader/program';
import { UniformType } from '../shader/uniformType.enum';
import { TextureAtlas } from '../texture';
import { RenderingMode } from './renderingMode.type';
import { VBOConfig } from './vbo.config';
import { WebGLRendererConfig } from './webgl.renderer.config';

/**
 * Internal-use utility type for representing attribute location and size information required only by the renderer
 *
 * Created on shader program initialisation and used in generically handling vertexAttribPointer() calls
 */
type AttributeLocationArray = Array<{
    readonly location: number;
    readonly size: number;
}>;

/**
 * Internal-use utility type for representing uniform location and type information required only by the renderer
 *
 * Created on shader program initialisation and used in generically handling glUniform*() calls
 */
type UniformLocationArray = Array<{
    readonly name: string;
    readonly location: WebGLUniformLocation;
    readonly type: UniformType;
}>;

/**
 * Internal-use utility interface describing a shader program's specification with information required only by the renderer
 *
 * Comprising a shader program's name, WebGL handle, and information about its attribute and uniform locations, constructed on shader
 *   program initialisation and used in generically handling shader program registration and switching
 */
interface ShaderProgramSpec {
    /** The name of the shader program */
    readonly name: string;
    /** The WebGL handle for the shader program */
    readonly program: WebGLProgram;
    /** The attribute information associated with the shader program */
    readonly attributeLocations: AttributeLocationArray;
    /** The uniform information for all 'static' (once per render call) uniforms */
    readonly staticUniformLocations: UniformLocationArray;
    /** the uniform information for all 'entity' (once per Entity) uniforms */
    readonly entityUniformLocations: UniformLocationArray;
}

/**
 * Internal-use utility interface describing a texture's specification with information only required by the renderer
 */
interface TextureSpec {
    /** The name of the texture */
    name: string;
    /** The GL Unit of the texture (eg gl.TEXTURE0) */
    unit: number;
    /** the Unit index of the texture (eg. unit - gl.TEXTURE0) to upload as a uniform to a Sampler*D() */
    uniformUnit: number;
    /** The WebGLTexture */
    texture: WebGLTexture;
}

/**
 * Core WebGLRenderer; utilised by the EntityManager to defer the rendering of Entities to the Canvas
 *
 * Handles every aspect of WebGL API interaction; including the construction and maintenance of Shaders and VBOs, and the rendering of game
 *   objects by way of a per-render-call configuration object
 *
 * Designed to operate entirely on outside configuration, so as to enable the EntityManager to implement abstracted optimisations for things
 *   like vertex management, buffering and shader switching
 *
 * @see Game
 * @see EntityManager
 */
export class WebGLRenderer {

    // TODO potentially temporary
    private projection2D = new Mat3();
    private perspective = new Mat4();
    private ortho = new Mat4();

    /** The WebGLRenderingContext retrieved from the Canvas */
    private readonly gl: WebGLRenderingContext;

    /** Game background Color, in its GL-friendly Float32Array form */
    private readonly backgroundColor: Float32Array;

    /** A maintained list of shader program specifications; mapped by their name for simple management and usage */
    private readonly shaderPrograms = new Map<string, ShaderProgramSpec>();

    /** Active shader program specification; used for frame-to-frame optimisation of shader switching */
    private activeShaderProgram: ShaderProgramSpec | null = null;

    /** A maintained list of VBO handles; mapped by their name for simple managment and usage */
    private readonly vbos = new Map<string, WebGLBuffer>();

    /** Active VBO name; used for frame-to-frame optimisation of VBO switching and vertexAttribPointer() calls */
    private activeVBOName: string | null = null;

    /** A maintained list of texture specifications; mapped by their name for simple management and usage */
    private readonly textures = new Map<string, TextureSpec>();

    /** Active texture specification; used for render-to-render optimisation of texture switching */
    private activeTexture: TextureSpec | null = null;

    /** Current rendering mode; used for differentiating some rendering functionality between 2D and 3D States */
    private mode: RenderingMode = '2D';

    /**
     * Constructor. Retrieve and store the WebGLRenderingContext from the given Canvas, then perform one-time setup of the context
     *
     * @param canvas the Canvas we're drawing to
     * @param clearColor the Game's background color, to be set as the gl clearColor once on init
     */
    constructor(private readonly game: Game, clearColor: Color) {
        const gl = game.canvas.getContext('webgl');

        if (!gl) {
            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'construct',
                message: 'Failed to retrieve WebGL Canvas context'
            });
        }

        this.gl = gl;

        this.backgroundColor = clearColor.float32Array;

        this.init();
    }

    public getProjection2D(): Mat3 {
        return this.projection2D;
    }

    public getPerspective(): Mat4 {
        return this.perspective;
    }

    public getOrtho(): Mat4 {
        return this.ortho;
    }

    public get activeTextureUnit(): number {
        // TODO error handling
        return this.activeTexture?.uniformUnit ?? -1;
    }

    /**
     * Clear the drawing buffer with the appropriate bitmask, account for depth buffer if we're rendering in 3D
     */
    public clearScreen(): void {
        let clearBit = this.gl.COLOR_BUFFER_BIT;

        if (this.mode === '3D') {
            clearBit = clearBit | this.gl.DEPTH_BUFFER_BIT;
        }

        this.gl.clear(clearBit);
    }

    /**
     * Create and store a VBO with a given name to be used as a buffering target and vertex source later on
     *
     * @param name the name of the VBO
     */
    public createVBO(name: string): void {
        const { gl } = this;

        const buffer = gl.createBuffer();
        if (!buffer) {
            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'createVBO',
                message: `Failed to create buffer with name '${name}'`
            });
        }

        this.vbos.set(name, buffer);
    }

    /**
     * Delete a VBO with a given name to release memory no longer required by the application
     *
     * @param name the name of the VBO
     */
    public deleteVBO(name: string): void {
        const { gl } = this;

        const buffer = this.vbos.get(name);

        if (buffer) {
            gl.deleteBuffer(buffer);
            this.vbos.delete(name);
        }
    }

    /**
     * Initialise and store a shader program with the given ShaderProgram specification, performing one-time retrieval of its attribute and
     *   uniform locations to persist in the ShaderProgramSpec map
     *
     * @param shader the ShaderProgram specification
     */
    public createShaderProgram(shader: ShaderProgram): void {
        const { gl } = this;
        const { vertex, fragment } = shader;

        // compile the shader sources
        const vertexCompiled = this.compileShader(gl.VERTEX_SHADER, vertex.source);
        const fragmentCompiled = this.compileShader(gl.FRAGMENT_SHADER, fragment.source);

        // create the shader program
        const program = gl.createProgram();
        if (!program) {
            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'createShaderProgram',
                message: `Failed to create Shader Program with name '${shader.name}'`
            });
        }

        // link the program
        gl.attachShader(program, vertexCompiled);
        gl.attachShader(program, fragmentCompiled);
        gl.linkProgram(program);

        // handle a linkage error by cleaning up and erroring
        const linked = gl.getProgramParameter(program, gl.LINK_STATUS); //eslint-disable-line @typescript-eslint/no-unsafe-assignment
        if (!linked) {
            const error = gl.getProgramInfoLog(program);

            gl.deleteProgram(program);
            gl.deleteShader(fragmentCompiled);
            gl.deleteShader(vertexCompiled);

            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'createShaderProgram',
                message: `Failed to link Shader Program with name '${shader.name}' : [${error ?? ''}]`
            });
        }

        // perform one-time setup of the shader program's attribute and uniform locations
        this.initializeShaderProgram(program, shader);
    }

    /**
     * Create a texture from an image with a given source
     *
     * // TODO lots of opportunity in here for configuration on a per-texture basis
     * // TODO texParameter*()
     *
     * @param textureAtlas the TextureAtlas representing the texture to load
     */
    public createTexture(textureAtlas: TextureAtlas): void {
        const { gl } = this;

        // set the texture unit and make it active
        const unit = gl.TEXTURE0 + this.textures.size;
        gl.activeTexture(unit);

        // create the texture
        const texture = gl.createTexture();
        if (!texture) {
            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'createTexture',
                message: `Failed to create texture with name '${textureAtlas.name}' and src '${textureAtlas.src}'`
            });
        }

        // initialise the texture as solid purple to enable rendering during asynchronous load and for visual recognition of failed loads
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 255, 255]));
        gl.bindTexture(gl.TEXTURE_2D, null);

        // handle the asynchronous image load by loading the actual image data into the texture when ready
        const image = new Image();
        image.src = textureAtlas.src;
        image.addEventListener('load', () => {
            gl.activeTexture(unit);
            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
        });

        this.textures.set(textureAtlas.name, { name: textureAtlas.name, texture, unit, uniformUnit: unit - gl.TEXTURE0 });
    }

    /**
     * Rendering mode switching routine; receives a State's rendering mode, indicating a transition towards either 2D or 3D rendering, and
     *   configures WebGL to render in the mode if it's different than the last one
     *
     * Effectively allows a Game to comprise both 2D and 3D States
     *
     * // TODO do we want to support mixed-mode states? Maybe complicates World/View/Projection handling over just saying a game is 2D | 3D
     *
     * @param mode the mode to switch to
     */
    public setRenderingMode(mode: RenderingMode): void {
        const { gl } = this;

        if (mode !== this.mode) {
            if (mode === '2D') {
                // disable the depth test for 2D rendering
                gl.disable(gl.DEPTH_TEST);
            }
            else {
                // enable and configure the depth test for 3D rendering
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LESS);
            }

            this.mode = mode;
        }
    }

    /**
     * Generic rendering method; using the information in a given WebGLRendererConfig, render some Entities
     *
     * @param config the WebGLRenderingConfig specifying what and how to render
     */
    public render(config: WebGLRendererConfig): void {
        const { gl } = this;

        // switch shader programs if necessary
        if (config.shaderProgramName !== this.activeShaderProgram?.name) {
            this.useShaderProgram(config.shaderProgramName);
        }

        // switch VBOs if necessary
        if (config.vbo.name !== this.activeVBOName) {
            this.useVBO(config.vbo);
        }

        // switch textures if necessary
        if (config.textureAtlasName && config.textureAtlasName !== this.activeTexture?.name) {
            this.useTexture(config.textureAtlasName);
        }

        const staticUniforms = this.activeShaderProgram?.staticUniformLocations;
        const entityUniforms = this.activeShaderProgram?.entityUniformLocations;

        // handle 'static' uniforms (vary once per render call)
        if (staticUniforms?.length) {
            for (const uniform of staticUniforms) {
                this.loadUniform(uniform.location, uniform.type, ShaderVariableResolver.resolveStaticVariable(uniform.name, this.game));
            }
        }

        if (entityUniforms?.length) {
            // if the shader program contains 'entity' uniforms, we need to do one draw call per Entity (per uniform set variation)
            let offset = 0;

            for (const e of config.entities) {
                // upload the Entity's uniform values
                for (const uniform of entityUniforms) {
                    const location = uniform.location;

                    if (location) {
                        this.loadUniform(location, uniform.type, ShaderVariableResolver.resolveEntityVariable(uniform.name, e));
                    }
                }

                // draw the a set of vertices from the VBO and update the offset for the next go round
                gl.drawArrays(config.vbo.glShape, offset, config.vbo.vertexCount);

                offset += config.vbo.vertexCount;
            }
        }
        else {
            // if the shader program contains no uniforms, we can draw all the entities in one batch
            gl.drawArrays(config.vbo.glShape, 0, config.vbo.vertexCount * config.entities.length);
        }
    }

    /**
     * Internal-use one-time WebGL configuration routine; set flags and enable features once at application initialisation
     *
     * // TODO make this configurable and expand its utility
     */
    private init(): void {
        const { gl } = this;

        // set clear color
        const [r, g, b, a] = this.backgroundColor;
        this.gl.clearColor(r, g, b, a);

        // enable transparency
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // configure the projection matrix
        this.projection2D = Mat3.projection(gl.canvas.width, gl.canvas.height);

        // TODO placeholder
        this.perspective = Mat4.perspective();
        this.ortho = Mat4.ortho();

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    /**
     * Internal-use single-shader source compilation routine for registering and compiling the individual Vertex and Fragment aspects of a
     *   ShaderProgram
     *
     * @param type the gl numerical type of the shader to create; either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
     * @param src the source of the shader to compile
     *
     * @returns the compiled WebGLShader
     */
    private compileShader(
        type: WebGLRenderingContext['VERTEX_SHADER'] | WebGLRenderingContext['FRAGMENT_SHADER'],
        src: string
    ): WebGLShader {

        const { gl } = this;
        const typeString = type === WebGLRenderingContext['VERTEX_SHADER'] ? 'Vertex Shader' : 'Fragment Shader';

        // create the shader
        const shader = gl.createShader(type);
        if (!shader) {
            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'compileShader',
                message: `Failed to create ${typeString} with source : [${src}]`
            });
        }

        // compile the shader source
        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        // handle compilation errors by cleaning up and erroring
        const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        if (!compiled) {
            const error = gl.getShaderInfoLog(shader);

            gl.deleteShader(shader);

            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'compileShader',
                message: `Failed to compile ${typeString} : [${error ?? ''}]`
            });
        }

        return shader;
    }

    /**
     * Perform one-time setup of a new shader program by retrieving information about its attribute and uniform locations and storing the
     *   results for later use in the ShaderProgramSpec map
     *
     * @param program the WebGLProgram to initialise
     * @param spec the ShaderProgram that was used to create the program
     */
    private initializeShaderProgram(program: WebGLProgram, spec: ShaderProgram): void {
        const { gl } = this;

        // switch to the program
        gl.useProgram(program);

        // retrieve all attribute locations
        const attributeLocations: AttributeLocationArray = [];

        for (const attr of spec.vertex.attributes) {
            attributeLocations.push({
                location: gl.getAttribLocation(program, attr.name),
                size: attr.size
            });
        }

        // retrieve all uniform locations
        const staticUniformLocations: UniformLocationArray = [];
        const entityUniformLocations: UniformLocationArray = [];

        const allUniforms = (spec.vertex.uniforms ?? []).concat(spec.fragment.uniforms);

        for (const uniform of allUniforms) {
            const location = gl.getUniformLocation(program, uniform.name);
            const locationArray = uniform.variation === ShaderVariableVariation.STATIC ? staticUniformLocations : entityUniformLocations;

            if (!location) {
                throw new ProtoGLError({
                    class: 'WebGLRenderer',
                    method: 'initializeShaderProgram',
                    message: `Failed to retrieve uniform location for uniform name '${uniform.name}' in shader program '${spec.name}'`
                });
            }

            locationArray.push({
                name: uniform.name,
                location,
                type: uniform.type
            });
        }

        // store the resulting information in the ShaderProgramSpec map
        this.shaderPrograms.set(spec.name, {
            name: spec.name,
            program,
            attributeLocations,
            staticUniformLocations,
            entityUniformLocations
        });

        // switch off of the program to clean up
        gl.useProgram(null);
    }

    /**
     * Internal-use shader switching routine; make the shader program, specified by name, active for draw calls
     *
     * @param name the name of the shader program to make active
     */
    private useShaderProgram(name: string): void {
        const { gl } = this;

        const program = this.shaderPrograms.get(name);
        if (!program) {
            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'useShaderProgram',
                message: `Failed to switch to Shader Program with name '${name}'`
            });
        }

        gl.useProgram(program.program);

        this.activeShaderProgram = program;
    }

    /**
     * Internal-use VBO switching routine; make the VBO, specified by a configuration, active for draw calls
     *
     * (re)buffer the vertices specified in the VBOConfig if its 'changed' flag is set, indicating either that it's new or that its vertex
     *   list has changed since the last time it was drawn
     *
     * @param vbo the VBOConfig representing the VBO to make active
     */
    private useVBO(vbo: VBOConfig): void {
        const { gl } = this;
        const buffer = this.vbos.get(vbo.name);

        if (!buffer) {
            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'useVBO',
                message: `Failed to switch to VBO with name '${vbo.name}'`
            });
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        // (re)buffer data if necessary
        if (vbo.changed) {
            gl.bufferData(gl.ARRAY_BUFFER, vbo.vertices, gl.DYNAMIC_DRAW);
        }

        // layout attributes with vertexAttribPointer
        let offset = 0;
        for (const attr of this.activeShaderProgram?.attributeLocations ?? []) {
            gl.enableVertexAttribArray(attr.location);
            gl.vertexAttribPointer(attr.location, attr.size, gl.FLOAT, false, vbo.vertexSize * 4, offset);

            offset += attr.size * 4;
        }

        this.activeVBOName = vbo.name;
    }

    /**
     * Internal-use texture switching routine; make the texture, specified by name, active for draw calls
     *
     * @param name the name of the texture to make active
     */
    private useTexture(name: string): void {
        const { gl } = this;

        const texture = this.textures.get(name);
        if (!texture) {
            throw new ProtoGLError({
                class: 'WebGLRenderer',
                method: 'useTexture',
                message: `Failed to switch to Texture with name '${name}'`
            });
        }

        gl.activeTexture(texture.unit);
        gl.bindTexture(gl.TEXTURE_2D, texture.texture);

        this.activeTexture = texture;
    }

    /**
     * Internal-use uniform upload routine; used in uploading uniform values as necessary in render()
     *
     * Encapsulates and limits the implicit relationship between the UniformType enum and associated uniform*() methods
     *
     * @param location the WebGLUniformLocation of the uniform to upload
     * @param type the UniformType of the uniform to upload
     * @param value the value of the uniform to upload
     */
    private loadUniform(location: WebGLUniformLocation, type: UniformType, value: Float32Array | number): void {
        const { gl } = this;

        switch (type) {
            case UniformType.VEC2:
                gl.uniform2fv(location, value as Float32Array);
                break;

            case UniformType.VEC3:
                gl.uniform3fv(location, value as Float32Array);
                break;

            case UniformType.VEC4:
                gl.uniform4fv(location, value as Float32Array);
                break;

            case UniformType.MAT3:
                gl.uniformMatrix3fv(location, false, value as Float32Array);
                break;

            case UniformType.MAT4:
                gl.uniformMatrix4fv(location, false, value as Float32Array);
                break;

            case UniformType.INTEGER:
                gl.uniform1i(location, value as number);
                break;

            case UniformType.FLOAT:
                gl.uniform1f(location, value as number);
                break;
        }
    }
}
