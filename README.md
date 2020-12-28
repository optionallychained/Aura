# ProtoGL-TS

ProtoGL-TS is a TypeScript game engine designed for the swift implementation of prototype WebGL browser games, providing a large base of built-in utility.

Built on the Entity-Component-System architecture and operating on the concept of distinct game states, ProtoGL-TS aims to enable a compartmentalised approach
to prototype creation, supporting developments of varying complexity.

See [ProtoGL-TS-Starter](https://github.com/jonnopon/ProtoGL-TS-Starter) for getting up and running with ProtoGL-TS fast.

This project is a WIP revival of [ProtoGL](https://github.com/jonnopon/ProtoGL) and its concepts.

Lofty/long-term Goals:
- Zero (or close to) dependencies
- Simplistic and easy-to-approach API and project structure
- Large base of built-in utility (geometry, components, systems, physics, text, UI, shaders, etc)
- 2D rendering with OpenGL *(...and canvas?)*
- 3D rendering with OpenGL
- Keyboard/Mouse, Gamepad, Touch support
- Solid documentation
- Automated testing
- Efficient and optimised builds

----

# TODO

- [x] **Step 1: Rough-and-ready kickstart (ProtoGL conceptual port)**
    - [x] Port some basic utilities from ProtoGL
        - [x] input
        - [x] (some) math
    - [x] Reach implementation of basic/rough render/input/game demo *(Canvas2D)*
        - [x] states
        - [x] frame deltas
        - [x] entities
        - [x] systems
        - [x] physics (movement)
        - [x] collision
        - [x] player-controlled movement
- [ ] **Step 2: Project Considerations**
    - [x] consider usage as an NPM package/library
        - [x] research TS library creation
        - [x] research + experiment with NPM package publication
    - [ ] re-approach bunding/distribution/typedef stuff
        - [ ] export collections, per-folder? - support patterns like "protogl/input" / "protogl/math"?
        - [x] NPM package - consider ideal build targets/resultant code level/structure (*commonJS?* / *ESM*)
        - [x] demo dist - consider ideal build targets/resultant code level/structure
    - [x] really think about usage as an NPM package by experimenting in a test project
        - [x] how to build game using engine as such?
        - [x] template/starter project to facilitate? Angular style?
    - [ ] Initialise Documentation
        - [ ] Technical documentation
        - [ ] User/API documentation
    - [ ] Initialise Testing
- [ ] **Step 3: ...etc *(misc notes)***
    - [ ] reconsider Math implementations; instanced/mutable? types only? statics? etc
        - [ ] port math from ProtoGL-JS *as and when needed*
    - [ ] reconsider Input Management
        - [ ] event/emitter type implementation?
        - [ ] input buffering?
        - [ ] observables?
    - [ ] strongly consider: Observables as an underlying engine utility?
        - thinking prompts: input, entity events, state events, system interrupts, etc?
    - [ ] `this` scoping or other creative solutions for:
        - [ ] state tick
        - [ ] entity update
        - [ ] misc: AABBCollisionBox onCollision
    - [ ] Consider decorators (Angular-style) for things like Components, Systems? - rather than interface or class implementation/extension
    - [ ] OpenGL
    - [ ] keyboard input not working for dist?
