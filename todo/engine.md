# Engine TODOs

## Math
- [x] consider: statics/interface vs instances
- [x] Vec2 - remaining operations
- [x] Vec3
- [x] Vec4
- [x] Mat3
- [x] Mat4
- [x] Colors
- [x] Randoms
- [x] Angles
- [ ] Quaternions


## Input
- [ ] Customisable 'ignorekeys' behaviour
- [ ] Input Buffering
- [ ] consider: Event Emitter type implementation
    - [ ] consider: Observables
- [ ] Mouse capture


## Entity
- [ ] consider: type or class based getComponent()/hasComponent()?
- [ ] Optimisations for EntityManager
    - [x] memoization of filters
    - [x] group-by-component for faster filtering
    - [ ] update-as-necessary (?)
    - [ ] render-as-necessary (?)


## Rendering
- [x] WebGL (2d)
    - prompt: IndexArrays
- [ ] Resize support
- [ ] Fullscreen support
- [ ] textures/sprites
- [ ] Cameras
- [ ] 3D
    - [ ] GL flags/config
    - [ ] 3D Geometry
    - [ ] 3D shaders
    - [ ] 3D Transforms


## World
- [ ] Representation of a world with coordinate system
- [ ] Mapping of world coords to screenspace coords
- [ ] Cameras


## System
- [ ] transitions - configure + restrict valid State transitions to enable better error handling
- [ ] Improved Physics (acceleration, gravity, etc)
    - *Long-term:* rigidbody + fluid physics
- [ ] Improved Collision (multiple collider types, etc)


## Text
- [ ] TextManager
- [ ] Overridable custom sprite-based font (carry-over from old ProtoGL)
- [ ] Support canvas text?
- [ ] Support in-game text via textures
- [ ] Wrapping
- [ ] Alignment
- [ ] emphasis


## UI
- [ ] UserInterfaceManager
- [ ] UI element library (panel, textbox, etc)


## Sound
- [ ] SoundManager
- [ ] consider: OpenAL?


## General
- [ ] Defined approach to auto-discovery/use of assets (images, sound, etc)
- [ ] consider (w/ input): Observables for general use
    - prompts: input, entity events, state events, system events/interrupts, frame events?
- [ ] Game instance access for Entity update
- [ ] Entity self access for Entity update
- [ ] Unified error handling approach
    - [ ] Entity Component get
    - [ ] System add/remove
    - [ ] System transition
    - [ ] Renderer failures
    - [ ] Entity Attribute/Uniform retrieval failures


## BUGS
- [ ] player control not working for demo:dist
    - issue with (entity).hasComponent()
