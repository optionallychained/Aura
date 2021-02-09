import { Color } from '../math/color';
import { ShaderProgram } from './shaders/shaderProgram';
import { WebGLRendererConfig } from './webgl.renderer.config';

/**
 * Core WebGLRenderer; utilised by the Game to defer the rendering of Entities to the Canvas
 *
 * // TODO abstraction layer or interface ensuring common renderer functionality
 *
 * @see Game
 */
export class WebGLRenderer {

    private gl: WebGLRenderingContext;

    private shaderPrograms = new Map<string, WebGLProgram>();
    private activeShaderProgram: WebGLProgram = 0;

    private vbos = new Map<string, WebGLBuffer>();

    constructor(private readonly canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl');

        if (!gl) {
            throw Error('No WebGL Context support');
        }

        this.gl = gl;
    }

    public clearScreen(color: Color): void {
        this.gl.clearColor(color.rf, color.gf, color.bf, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public createVBO(name: string): void {
        const { gl } = this;

        const buffer = gl.createBuffer();
        if (!buffer) {
            // TODO
            throw Error('Could not create buffer');
        }

        this.vbos.set(name, buffer);
    }

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


    // TODO ULTRA BASIC INEFFICIENT GET-WORKING
    public render(config: WebGLRendererConfig): void {
        const { gl } = this;

        this.bindVBO(config.VBOName);
        this.useShaderProgram(config.shaderProgramName);

        let offset = 0;
        for (const attr of Object.keys(config.attributes)) {
            const size = config.attributes[attr];

            const attributeLocation = gl.getAttribLocation(this.activeShaderProgram, attr);
            gl.enableVertexAttribArray(attributeLocation);
            gl.vertexAttribPointer(attributeLocation, size, gl.FLOAT, false, config.vertSize * 4, offset);

            offset += size * 4;
        }

        this.bufferVertices(config.vertices);

        gl.drawArrays(config.glShape, 0, config.vertCount);
    }



    private compileShader(type: number, src: string): WebGLShader {
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

    private useShaderProgram(name: string): void {
        const { gl } = this;

        const program = this.shaderPrograms.get(name);
        if (!program) {
            // TODO
            throw Error('Could not use program');
        }

        gl.useProgram(program);
        this.activeShaderProgram = program;
    }

    private bindVBO(name: string): void {
        const { gl } = this;
        const buffer = this.vbos.get(name);

        if (!buffer) {
            // TODO
            throw Error('Failed to bind buffer');
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    }

    private bufferVertices(vertices: ArrayBuffer): void {
        const { gl } = this;

        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    }
}
