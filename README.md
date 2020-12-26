# ProtoGL-TS

ProtoGL-TS is a game engine designed for prototyping browser games in TypeScript, rendering with OpenGL *(and maybe Canvas)* and providing a large base of
built-in utility to enable the swift creation of game prototypes.

Built on the Entity-Component-System architecture and operating as a state machine, ProtoGL-TS enables a compartmentalised approach to game implementation.

This project is a Work In Progress port/rebuild/redesign of a legacy project implemented in pure ES5-compliant JavaScript.

Overall long-term Goals:
- Zero (or as close to zero as possible) dependencies
- Simplistic surface-level API for creating games quickly, with a high level of built-in engine utility (shapes, entities, components, systems, text, UI, shaders, etc)
- 2D support (OpenGL, Canvas?)
- 3D support (OpenGL)
- Keyboard/Mouse, Gamepad, Touch support
- Efficient builds and optimised package sizes

## TODO

- **Step 1: Rough-and-ready Basic Implementations**
    - [ ] port some utilities from ProtoGL-JS that're directly reusable
        - [x] input
        - [x] (some) math
    - [ ] Reach implementation of basic render/input demo *(Canvas2D for now)*
        - [x] states
        - [x] frame deltas
        - [x] entities
        - [ ] systems
        - [ ] player-controlled basic 2D movement
- **Step 2: Project Considerations**
    - [ ] consider usage as an NPM package/library
        - [ ] research TS library creation
        - [ ] research + experiment with NPM package publication *(private)*
        - [ ] decisions on typedefs vs classes for certain utilities
        - [ ] think about namespacing + research methods
        - [ ] try to set things up for this purpose going forward
    - [ ] consider usage as a Script/JS library?
        - [ ] decide: do we even want to support this type of usage?
- **Step 3: ...etc *(misc)***
    - [ ] reconsider Math implementations; instanced/mutable? types only? statics? etc - consider ideal usage patterns
        - [ ] choose approach, then port math from ProtoGL-JS *as and when needed*
    - [ ] reconsider Input Management
        - [ ] event/emitter type implementation?
        - [ ] input buffering?
        - [ ] observables?
    - [ ] strongly consider: Observables as an underlying engine utility? - event-driven intra-state approach?
        - thinking prompts: input, entity events, state events, etc?
    - [ ] OpenGL and all the crazy that brings
    - [ ] cameras
    - [ ] ...etc
