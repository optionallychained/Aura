# Engine TODOs

## Math
- [x] consider: statics/interface vs instances
- [x] Vec2 - remaining operations
- [ ] Vec3
- [ ] Vec4
- [ ] Mat3
- [ ] Mat4
- [ ] HexToRGB
    - [ ] Support Hex colour definitions as well as Vec3/RGB
        - prompt: Color wrapping class supporting color-related operations?


## Input
- [ ] Customisable 'ignorekeys' behaviour
- [ ] Input Buffering
- [ ] consider: Event Emitter type implementation
    - [ ] consider: Observables


## Entity
- [ ] consider: type or class based getComponent()/hasComponent()?
- [ ] Optimisations for EntityManager
    - [ ] memoization of filters
    - [ ] group-by-component for faster filtering
    - [ ] update-as-necessary
    - [ ] render-as-necessary


## Rendering
- [ ] Resize support
- [ ] Fullscreen support
- [ ] textures/sprites
- [ ] Geometry/Texture/etc abstraction layer to support multiple rendering contexts
- [ ] WebGL (2d)
    - prompt: IndexArrays
- [ ] Cameras (2d)


## System
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
- [ ] consider: type safety OR error handling for:
    - [ ] System names (add/remove)
    - [ ] State names (add/remove/switch to)
- [ ] error handling where absolute compile-time type-safety is not possible or too much effort?
    - [ ] system retrieval?
    - [ ] component retrieval/removal?
    - [ ] state retrieval/switching?

## BUGS
- [ ] player control not working for demo:dist
    - issue with (entity).hasComponent()


## Long-term
- [ ] 3D (renderer, physics, components, etc)
