# Project

- [x] **Consistency:** readonly + ReadonlyArray usage
    - [x] constructors
    - [x] interfaces

- [x] **Consistency:** instance+.config.ts usage or class extension as appropriate; review/justify
    - [x] Systems
    - [x] States
    - [x] Game
    - [x] Renderer
    - [x] Shader
    - [x] Geometry
    - [x] Entity
    - [x] Component
    - [x] **Consider:** config store + pass-through-get pattern...do we even like this?
        - ...vs config retrieve + extract

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
