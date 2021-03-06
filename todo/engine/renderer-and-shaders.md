# Renderer + Shaders

- **Optimisation/fundamentals:**
    - [ ] Index/Element Arrays

- [ ] Fullscreen

- [ ] Resize

- [x] Textures

- [ ] Configurable GL flags for init(), where appropriate

- [ ] Lighting
    - [ ] 3D
    - [ ] 2D

- [ ] "particles"

- [ ] Cameras (in tandem with World) + perspective/lookAt
    - [ ] 2D
    - [ ] 3D (near/far depth range?)


- [ ] automatic "registration" (creation) of Shaders based on use?
    - ...instead of forced pre-start() shader registration


- **Long-term:**
    - [ ] WebGL 2.0 as preferred context, w/ 1.0 as fallback
        - ...Vertex Array Objects over VBOs
        - ...GLSL upgrade - split shader implementations?
    - **Re-evaluate EntityManager/WebGLRenderer relationship:**
    - [ ] EntityManager/WebGLRenderer strong coupling by way of VBOs + ShaderPrograms
        - ...maybe unpickable with WebGL2.0/VAOs
    - [ ] EntityManager shader+model VBO provisioning - can we just go by shader?
        - ...maybe unpickable with WebGL2.0/VAOs
    - [ ] *bindAttribLocation*
        - ...investigate value in binding all known attributes (ShaderVariableResolver) at shaderProgram init
        - ...does this allow for movement of enableVertexAttribArray/vertexAttribPointer from useVBO() to createVBO?
        - ...maybe leave this and related work on optimising vertex buffers to WebGL2.0/VAOs
    - [ ] **Consider/research:** Multiple buffers per shader? -> one per attribute mebbe? Is this worthwhile?
