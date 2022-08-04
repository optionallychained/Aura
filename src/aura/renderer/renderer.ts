import { AuraError } from '../core/aura.error';
import { GameBase } from '../core/game.base';
import { Color } from '../math/color';
import { ShaderProgram } from '../shader/program/shaderProgram';
import { ShaderVariableResolver } from '../shader/shaderVariableResolver';
import { UniformType } from '../shader/uniformType.enum';
import { UniformVariation } from '../shader/uniformVariation.enum';
import { TextureAtlas } from '../texture/textureAtlas';
import { RendererConfig, AttributeLocationArray, ShaderProgramSpec, TextureSpec, UniformLocationArray } from './renderer.config';
import { VBOConfig } from './vbo.config';

/**
 * Core WebGL Renderer; utilised by the EntityManager to defer the rendering of Entities to the Canvas
 *
 * Handles every aspect of WebGL API interaction; including the construction and maintenance of Shaders and VBOs, and the rendering of game
 *   objects by way of a per-render-call configuration object
 *
 * Designed to operate entirely on outside configuration, so as to enable the EntityManager to implement abstracted optimisations for things
 *   like vertex management, buffering and shader switching
 */
export class Renderer {

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

    /** Current rendering mode; used for differentiating some rendering functionality between 2D and 3D Games */
    private mode: '2D' | '3D' = '2D';

    /** Reference to the Game the Renderer belongs to */
    private game: GameBase | undefined;

    /**
     * Constructor. Take the Game the Renderer belongs to, then perform one-time setup of the Canvas context
     *
     * @param game the Game the Renderer belongs to
     * @param clearColor the Game's background color, to be set once as the gl clearColor
     */
    constructor(game: GameBase, clearColor: Color) {
        this.game = game;

        const gl = game.canvas?.getContext('webgl');

        if (!gl) {
            throw new AuraError({
                class: 'Renderer',
                method: 'construct',
                message: 'Failed to retrieve WebGL Canvas context'
            });
        }

        this.gl = gl;

        this.backgroundColor = clearColor.float32Array;
        this.init();
    }

    /**
     * Retrieve the active texture unit, used for configuring Sampler2Ds in shaders
     */
    public get activeTextureUnit(): number {
        return this.activeTexture?.uniformUnit ?? -1;
    }

    /**
     * Clear the drawing buffer with the appropriate bitmask, accounting for depth buffer if we're rendering in 3D
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
            throw new AuraError({
                class: 'Renderer',
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
            this.activeVBOName = '';

            // disable attribute arrays
            for (const attr of this.activeShaderProgram?.attributeLocations ?? []) {
                gl.disableVertexAttribArray(attr.location);
            }
        }
    }

    /**
     * Initialise and store a shader program and perform one-time setup of its attribute and uniform locations
     *
     * @param shader the ShaderProgram specification
     */
    public createShaderProgram(shader: ShaderProgram): void {
        const { gl } = this;
        const { vertex, fragment } = shader;

        // compile the shader sources
        const vertexCompiled = this.compileShader(shader.name, gl.VERTEX_SHADER, vertex.source);
        const fragmentCompiled = this.compileShader(shader.name, gl.FRAGMENT_SHADER, fragment.source);

        // create the shader program
        const program = gl.createProgram();
        if (!program) {
            throw new AuraError({
                class: 'Renderer',
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

            throw new AuraError({
                class: 'Renderer',
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
            throw new AuraError({
                class: 'Renderer',
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

        if (!this.imageIsSameOrigin(textureAtlas.src)) {
            image.crossOrigin = '';
        }

        image.addEventListener('load', () => {
            gl.activeTexture(unit);
            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.generateMipmap(gl.TEXTURE_2D);
        });

        this.textures.set(textureAtlas.name, { name: textureAtlas.name, texture, unit, uniformUnit: unit - gl.TEXTURE0 });
    }

    /**
     * Extra WebGL state configuation for specific 2D and 3D related state
     */
    public setRenderingMode(mode: '2D' | '3D'): void {
        const { gl } = this;

        if (mode === '3D') {
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LESS);

            gl.enable(gl.CULL_FACE);
        }

        this.mode = mode;
    }

    /**
     * Generic rendering method; using the information in a given RendererConfig, render some Entities
     *
     * @param config the RendererConfig specifying what and how to render
     */
    public render(config: RendererConfig): void {
        const { gl } = this;

        // switch shader programs if necessary
        if (config.shaderProgramName !== this.activeShaderProgram?.name) {
            this.useShaderProgram(config.shaderProgramName);
        }

        // switch VBOs if necessary
        if (config.vbo.name !== this.activeVBOName || config.vbo.changed) {
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
                // TODO instance of destroy() being annoying; Game optional
                // eslint-disable-next-line
                this.loadUniform(uniform.location, uniform.type, ShaderVariableResolver.resolveStaticUniform(uniform.name, this.game!));
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
                        this.loadUniform(location, uniform.type, ShaderVariableResolver.resolveEntityUniform(uniform.name, e));
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
     * Unlink the Renderer's Game reference, allowing for garbage collection on Game destroy
     *
     * // TODO incomplete, part of the first-working-version of the destroy() solution
     */
    public destroy(): void {
        this.game = undefined;
    }

    /**
     * One-time WebGL global state configuration, where configurations apply to both 2D and 3D rendering modes
     */
    private init(): void {
        const { gl } = this;

        // set clear color
        const [r, g, b, a] = this.backgroundColor;
        this.gl.clearColor(r, g, b, a);

        // enable transparency
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // viewport
        gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);

        window.addEventListener('resize', () => {
            gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);
        });
    }

    /**
     * Compile an individual FragmentShader or VertexShader
     *
     * @param name the name of the shader
     * @param type the type of the shader - vertex or fragment
     * @param src the shader source
     *
     * @returns the compiled WebGLShader
     */
    private compileShader(
        name: string,
        type: WebGLRenderingContext['VERTEX_SHADER'] | WebGLRenderingContext['FRAGMENT_SHADER'],
        src: string
    ): WebGLShader {

        const { gl } = this;
        const typeString = type === WebGLRenderingContext['VERTEX_SHADER'] ? 'Vertex Shader' : 'Fragment Shader';

        // create the shader
        const shader = gl.createShader(type);
        if (!shader) {
            throw new AuraError({
                class: 'Renderer',
                method: 'compileShader',
                message: `Failed to create ${typeString} with name ${name}`
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

            throw new AuraError({
                class: 'Renderer',
                method: 'compileShader',
                message: `Failed to compile ${typeString} with name ${name} : [${error ?? ''}]`
            });
        }

        return shader;
    }

    /**
     * Perform one-time setup of a ShaderProgram's attribute and uniform locations, storing the information in the ShaderProgramSpec map
     *
     * @param program the WebGLProgram to initialise
     * @param spec the ShaderProgramSpec that was used to create the program
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
            const locationArray = uniform.variation === UniformVariation.STATIC ? staticUniformLocations : entityUniformLocations;

            if (!location) {
                throw new AuraError({
                    class: 'Renderer',
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
     * Switch to the named Shader Program
     *
     * @param name the name of the Shader Program to switch to
     */
    private useShaderProgram(name: string): void {
        const { gl } = this;

        const program = this.shaderPrograms.get(name);
        if (!program) {
            throw new AuraError({
                class: 'Renderer',
                method: 'useShaderProgram',
                message: `Failed to switch to Shader Program with name '${name}'`
            });
        }

        gl.useProgram(program.program);

        this.activeShaderProgram = program;
    }

    /**
     * Switch to the VBO with the given VBOConfig, configuring attribute points.
     *
     * Rebuffers the VBO's vertex array if it has been marked as changed between renders
     *
     * @param vbo the VBOConfig specifying the VBO to switch to
     */
    private useVBO(vbo: VBOConfig): void {
        const { gl } = this;
        const buffer = this.vbos.get(vbo.name);

        if (!buffer) {
            throw new AuraError({
                class: 'Renderer',
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
     * Switch to the named Texture
     *
     * @param name the name of the Texture to switch to
     */
    private useTexture(name: string): void {
        const { gl } = this;

        const texture = this.textures.get(name);
        if (!texture) {
            throw new AuraError({
                class: 'Renderer',
                method: 'useTexture',
                message: `Failed to switch to Texture with name '${name}'`
            });
        }

        gl.activeTexture(texture.unit);
        gl.bindTexture(gl.TEXTURE_2D, texture.texture);

        this.activeTexture = texture;
    }

    /**
     * Upload a uniform of a given type and value to the given uniform location as previously retrieved for a ShaderProgram
     *
     * @param location the loction of the uniform to upload
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

    /**
     * Check whether or not a given image is sourced from the same origin as that which Aura is running on; used in supporting crossorign
     *   textures
     *
     * @param url the source URL of the image
     * @returns
     */
    private imageIsSameOrigin(url: string): boolean {
        return new URL(url, window.location.href).origin === window.location.origin;
    }
}
