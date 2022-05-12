# Engine

Aura.


## TODO


### Engine

- Sounds (WebAudio API?)
- Materials?
- Re-evaluate engine architecture:
    - type differentiation mechanisms for 2D/3D split aspects
    - consistency of design approach for core aspects (Config/Class/Instantiate/Extend) / (States, Components, Systems, Geometry, etc)
    - use of @Component for supporting class-based management; use of decorators elsewhere?
- Mobile support
    - device detection
    - viewport sizing
    - touch (associated: Input)
- Consider "zero config" setup - default shader registrations, systems, etc


### Testing

- Unit + integration testing for core aspects
    - may require a look at something akin to dep injection for Game
- flesh out math tests
    - for mat + vec, move to externally-sourced expected results
