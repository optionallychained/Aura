import { Color } from '../math';
import { ShaderProgram } from '../shader';
import { UniformType } from '../shader/uniformType';
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
    // TODO type for this
    private shaderPrograms = new Map<string, {
        program: WebGLProgram,
        attributes: Array<{ location: number, size: number }>,
        uniformLocations: { [name: string]: WebGLUniformLocation | null }
    }>();

    /** Active Shader Program name; used for frame-to-frame optimisation of gl API calls */
    private activeShaderProgramName = '';

    /** Active Shader Program numerical value; used for frame-to-frame optimisation of gl API calls */
    private activeShaderProgram: {
        program: WebGLProgram,
        attributes: Array<{ location: number, size: number }>,
        uniformLocations: { [name: string]: WebGLUniformLocation | null }
    } | null = null;

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
        const { vertex, fragment } = shader;

        const vertexCompiled = this.compileShader(gl.VERTEX_SHADER, vertex.source);
        const fragmentCompiled = this.compileShader(gl.FRAGMENT_SHADER, fragment.source);

        const program = gl.createProgram();
        if (!program) {
            // TODO
            throw Error('Failed to create Shader Program');
        }

        gl.attachShader(program, vertexCompiled);
        gl.attachShader(program, fragmentCompiled);
        gl.linkProgram(program);

        const linked = gl.getProgramParameter(program, gl.LINK_STATUS); //eslint-disable-line @typescript-eslint/no-unsafe-assignment
        if (!linked) {
            const error = gl.getProgramInfoLog(program);
            // TODO
            console.log('PROGRAM LINK ERROR', error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentCompiled);
            gl.deleteShader(vertexCompiled);
            throw Error(`Failed to link shader program [${error ?? ''}]`);
        }

        // switch to the newly-created program so as to get its attribute and uniform locations
        gl.useProgram(program);

        const attributes: Array<{ location: number, size: number }> = [];
        const uniformLocations: { [name: string]: WebGLUniformLocation | null } = {};

        for (const attr of Object.keys(vertex.attributes)) {
            attributes.push({
                location: gl.getAttribLocation(program, attr),
                size: vertex.attributes[attr]
            });
        }

        for (const uniform of (Object.keys(vertex.uniforms) ?? []).concat(Object.keys(fragment.uniforms))) {
            uniformLocations[uniform] = gl.getUniformLocation(program, uniform);
        }

        this.shaderPrograms.set(shader.name, {
            program,
            attributes,
            uniformLocations
        });

        // switch away from the program to clean up the GL State
        gl.useProgram(null);
    }

    /**
     * Generic rendering method; using the information in a given WebGLRendererConfig, render some vertices
     *
     * @param config the WebGLRenderingConfig specifying what and how to render
     */
    public render(config: WebGLRendererConfig): void {
        const { gl } = this;

        if (config.vbo.name !== this.activeVBOName) {
            this.useVBO(config.vbo);
        }

        if (config.shaderProgramName !== this.activeShaderProgramName) {
            this.useShaderProgram(config.shaderProgramName, config.vbo.vertexSize);
        }

        let offset = 0;
        for (const uniformSet of config.uniforms) {
            for (const [name, uConfig] of Object.entries(uniformSet)) {
                const location = this.activeShaderProgram?.uniformLocations[name];

                if (location) {
                    switch (uConfig.type) {
                        case UniformType.VEC2:
                            gl.uniform2fv(location, uConfig.value);
                            break;
                        case UniformType.VEC3:
                            gl.uniform3fv(location, uConfig.value);
                            break;
                        case UniformType.VEC4:
                            gl.uniform4fv(location, uConfig.value);
                            break;
                        case UniformType.MAT3:
                            gl.uniformMatrix3fv(location, false, uConfig.value);
                            break;
                        case UniformType.MAT4:
                            gl.uniformMatrix4fv(location, false, uConfig.value);
                            break;
                    }
                }
            }

            gl.drawArrays(config.vbo.glShape, offset, config.vbo.vertexCount);

            offset += config.vbo.vertexCount;
        }
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
    private useShaderProgram(name: string, vertSize: number): void {
        const { gl } = this;

        const program = this.shaderPrograms.get(name);
        if (!program) {
            // TODO
            throw Error('Could not use program');
        }

        gl.useProgram(program.program);
        this.activeShaderProgramName = name;
        this.activeShaderProgram = program;

        // set up attribute pointers
        let offset = 0;
        for (const attr of program.attributes) {
            gl.enableVertexAttribArray(attr.location);
            gl.vertexAttribPointer(attr.location, attr.size, gl.FLOAT, false, vertSize * 4, offset);

            offset += attr.size * 4;
        }
    }

    /**
     * Internal-use VBO switching routine; make the VBO, specified by name, active for draw calls
     *
     * @param name the name of the VBO to make active
     */
    private useVBO(vbo: WebGLRendererConfig['vbo']): void {
        const { gl } = this;
        const buffer = this.vbos.get(vbo.name);

        if (!buffer) {
            // TODO
            throw Error('Failed to bind buffer');
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        if (vbo.changed) {
            gl.bufferData(gl.ARRAY_BUFFER, vbo.vertices, gl.DYNAMIC_DRAW);
        }

        this.activeVBOName = vbo.name;
        this.activeVBO = buffer;
    }
}
