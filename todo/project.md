# Project

- [ ] **Consistency:** readonly + ReadonlyArray usage
    - [ ] constructors
    - [ ] interfaces

- [ ] **Consistency:** instance+.config.ts usage or class extension as appropriate; review/justify
    - [ ] Systems
    - [ ] States
    - [ ] Game
    - [ ] Renderer
    - [ ] Shader
    - [ ] Geometry
    - [ ] Component

- [ ] Review barelling approach
    - [ ] selectively export only the relevant public API for consumers
    - ...are resultant consumer imports good?
    - ...does it cause issues with build optimisation?

- [ ] DebugMode
    - [ ] frame-by-frame execution
    - [ ] granular frame data output
    - [ ] **Consider:** on-screen controls?

- [ ] **Consider/Experiment:** Save serialization system?

- **Consider:** "zero config" setup:
    - [ ] Default Systems?
    - [ ] Default Shader registration?
    - [ ] Default Geometry?

- [ ] Mobile support
    - [ ] device detection
    - [ ] viewport sizing/fullscreen-by-default
    - [ ] touch input (see Input)
