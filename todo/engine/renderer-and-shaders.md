# Renderer + Shaders

- **Optimisation/fundamentals:**
    - [ ] Index/Element Arrays
    - [ ] *bindAttribLocation*
        - ...bind all known attributes (EntityShaderMap) at ShaderProgram init
        - ...explore how this improves vertexAttribPointer - at VBO *init*, not *switch*?
        - ...maybe removed need for render-per-shader+model, in favour of render-per-shader?

- [ ] Fullscreen

- [ ] Resize

- [ ] Textures

- [ ] Configurable GL flags for init(), where appropriate

- [ ] Lighting
    - [ ] 3D
    - [ ] 2D

- [ ] "particles"

- [ ] Cameras (in tandem with World) + perspective/lookAt
    - [ ] 2D
    - [ ] 3D (near/far depth range?)

- **Long-term:**
    - [ ] WebGL 2.0 as preferred context, w/ 1.0 as fallback
        - ...Vertex Array Objects over VBOs
        - ...GLSL upgrade - split shader implementations
