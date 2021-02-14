import { Color } from '../math';
import { ShaderProgram } from '../shader';
import { WebGLRendererConfig } from './webgl.renderer.config';

/**
 * Core WebGLRenderer; utilised by the Game to defer the rendering of Entities to the Canvas
 *
 * Currently built to-purpose for 2D rendering only
 *
 * @see Game
 */
export class WebGLRenderer {

    /** The WebGL Rendering context retrieved from the Canvas */
    private gl: WebGLRenderingContext;

    /** Shader Programs; mapped by their name for simple management and usage */
    private shaderPrograms = new Map<string, WebGLProgram>();

    /** Active Shader Program name; used for frame-to-frame optimisation of gl API calls */
    private activeShaderProgramName = '';

    /** Active Shader Program numerical value; used for frame-to-frame optimisation of gl API calls */
    private activeShaderProgram: WebGLProgram = 0;

    /** VBOs; mapped by their name for simple managment and usage */
    private vbos = new Map<string, WebGLBuffer>();

    /** Active VBO name; used for frame-to-frame optimisation of gl API calls */
    private activeVBOName = '';

    /** Active VBO numerical value; used for frame-to-frame optimisation of gl API calls */
    private activeVBO: WebGLBuffer = 0;

    /**
     * Constructor. Retrieve and store the WebGLRenderingContext from the given Canvas, then perform one-time setup of the context
     *
     * @param canvas the Canvas we're drawing to
     * @param clearColor the Game's background color, to be set as the gl clearColor once on init
     */
    constructor(private readonly canvas: HTMLCanvasElement, private readonly clearColor: Color) {
        const gl = canvas.getContext('webgl');

        if (!gl) {
            throw Error('No WebGL Context support');
        }

        this.gl = gl;

        this.init();
    }

    /**
     * Clear the screen to the previously-configured clearColor
     */
    public clearScreen(): void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    /**
     * Create and store a VBO with a given name to be used as a buffering target later on for a given purpose
     *
     * @param name the name of the VBO
     */
    public createVBO(name: string): void {
        const { gl } = this;

        const buffer = gl.createBuffer();
        if (!buffer) {
            // TODO
            throw Error('Could not create buffer');
        }

        this.vbos.set(name, buffer);
    }

    /**
     * Initialise and store a shader program with the given sources and name specified in the ShaderProgram
     *
     * @param shader the ShaderProgram specification
     */
    public createShaderProgram(shader: ShaderProgram): void {
        const { gl } = this;
        const { vertexSource, fragmentSource } = shader;

        const vertex = this.compileShader(gl.VERTEX_SHADER, vertexSource);
        const fragment = this.compileShader(gl.FRAGMENT_SHADER, fragmentSource);

        const program = gl.createProgram();
        if (!program) {
            // TODO
            throw Error('Failed to create Shader Program');
        }

        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);

        const linked = gl.getProgramParameter(program, gl.LINK_STATUS); //eslint-disable-line @typescript-eslint/no-unsafe-assignment
        if (!linked) {
            const error = gl.getProgramInfoLog(program);
            // TODO
            console.log('PROGRAM LINK ERROR', error);
            gl.deleteProgram(program);
            gl.deleteShader(fragment);
            gl.deleteShader(vertex);
            throw Error(`Failed to link shader program [${error ?? ''}]`);
        }

        this.shaderPrograms.set(shader.name, program);
    }

    /**
     * Generic rendering method; using the information in a given WebGLRendererConfig, render some vertices
     *
     * @param config the WebGLRenderingConfig specifying what and how to render
     */
    public render(config: WebGLRendererConfig): void {
        const { gl } = this;

        if (config.VBOName !== this.activeVBOName) {
            this.bindVBO(config.VBOName);
        }

        if (config.shaderProgramName !== this.activeShaderProgramName) {
            this.useShaderProgram(config.shaderProgramName);
        }

        let offset = 0;
        for (const attr of Object.keys(config.attributes)) {
            const size = config.attributes[attr];

            // per-shader-program, the location of attributes never changes; this can be done once, maybe as part of building a shader
            const attributeLocation = gl.getAttribLocation(this.activeShaderProgram, attr);
            gl.enableVertexAttribArray(attributeLocation);
            gl.vertexAttribPointer(attributeLocation, size, gl.FLOAT, false, config.vertSize * 4, offset);

            offset += size * 4;
        }

        for (const uniform of Object.keys(config.uniforms)) {
            const val = config.uniforms[uniform];

            // per-shader-program, the location of attributes never changes; this can be done once, maybe as part of building a shader
            const uniformLocation = gl.getUniformLocation(this.activeShaderProgram, uniform);
            switch (val.type) {
                case 'mat3':
                    gl.uniformMatrix3fv(uniformLocation, false, val.value);
                    break;

                case 'vec4':
                    gl.uniform4fv(uniformLocation, val.value);
                    break;
            }
        }

        this.bufferVertices(config.vertices);

        gl.drawArrays(config.glShape, 0, config.vertCount);
    }

    /**
     * Internal-use GL configuration routine; set flags and enable features once at application initialisation
     */
    private init(): void {
        const { gl } = this;

        // set clear color
        this.gl.clearColor(this.clearColor.rf, this.clearColor.gf, this.clearColor.bf, this.clearColor.a);

        // enable transparency
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    /**
     * Internal-use single-shader compilation routine for registering and compiling the individual Vertex and Fragment aspects of a ShaderProgram
     *
     * @param type the gl numerical type of the shader to create; either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
     * @param src the source of the shader to compile
     *
     * @returns the compiled GL Shader
     */
    private compileShader(type: WebGLRenderingContext['VERTEX_SHADER'] | WebGLRenderingContext['FRAGMENT_SHADER'], src: string): WebGLShader {
        const { gl } = this;

        const shader = gl.createShader(type);
        if (!shader) {
            // TODO
            throw Error('Failed to create shader');
        }

        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        if (!compiled) {
            const error = gl.getShaderInfoLog(shader);
            // TODO
            console.log('SHADER COMPILE ERROR', error);
            gl.deleteShader(shader);
            throw Error(`Failed to compile shader [${error ?? ''}]`);
        }

        return shader;
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
            // TODO
            throw Error('Could not use program');
        }

        gl.useProgram(program);
        this.activeShaderProgramName = name;
        this.activeShaderProgram = program;
    }

    /**
     * Internal-use VBO switching routine; make the VBO, specified by name, active for draw calls
     *
     * @param name the name of the VBO to make active
     */
    private bindVBO(name: string): void {
        const { gl } = this;
        const buffer = this.vbos.get(name);

        if (!buffer) {
            // TODO
            throw Error('Failed to bind buffer');
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        this.activeVBOName = name;
        this.activeVBO = buffer;
    }

    /**
     * Internal-use VBO buffering routine; buffer the given vertex data to the active VBO
     *
     * @param vertices the vertices to buffer
     */
    private bufferVertices(vertices: ArrayBuffer): void {
        const { gl } = this;

        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    }
}
