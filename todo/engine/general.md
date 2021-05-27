# General

- [x] Unified error handling
    - [x] Entity
        - [x] Component management
    - [x] Game
        - [x] System management
        - [x] Data
        - [x] State management
    - [x] WebGLRenderer
        - [x] GL API failures
    - [x] ShaderVariableResolver
        - [x] Resolver not found
        - [x] No value
        - [x] Register + Override misuse
        - [x] look at *Resolver.type in conjunction with decision on Entity->Component management; tweak handling as appropriate
    

- [ ] Defined/configurable asset detection + loading
    - [x] images
    - [ ] sound

- [ ] **Consider:** Observables for general use
    - ...see Input consideration
    - ...Entity Events, State Events, System Events/Interrupts...


- [ ] **Consider/Experiment:** Generification of 2D/3D Component/System/etc splits?

- [ ] Destroy():
    - handling of canvas + game references is...annoying. Better way?
    - actual teardown of WebGL resources in Renderer
    - ...etc
