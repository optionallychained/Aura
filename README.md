# ProtoGL-TS

ProtoGL-TS is a TypeScript game engine designed for the swift implementation of prototype WebGL browser games, providing a large base of built-in utility.

Built on the Entity-Component-System architecture and operating on the concept of distinct game states, ProtoGL-TS aims to enable a compartmentalised approach
to prototype creation, supporting developments of varying complexity.

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


## Setup

- Install [NPM](https://nodejs.org/)
- Clone
- Terminal: `npm install`


## Develop

- Terminal: `npm run dev`
    - *Alternatively*: Run Debug configuration in VSCode
- Work on engine in `src/engine/`
- Work on demo/game in `src/demo/`
- View output at `localhost:8080`


## Distribute 

- Terminal: `npm run dist`
- Retrieve build from `dist/`

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
    - [x] consider usage as a Script include/JS library?
    - [ ] Initialise Documentation
        - [ ] Technical documentation
        - [ ] User/API documentation
    - [ ] Initialise Testing
    - [ ] Think about: ProtoGL-starter/ProtoGL-template for quickstart gamedev?
    - [ ] Think about: separate engine and demo into distinct projects? (makes some script stuff simpler?)
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
