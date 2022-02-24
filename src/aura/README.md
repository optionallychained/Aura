# Engine

Aura.


## TODO


### Engine

- Sounds (WebAudio API?)
- Materials?
- Restructure
    - shallower grouping
    - better 2D/3D separation
        - remove in-code 2D/3D specifications where appropriate
- Re-evaluate type differentiation mechanisms for 2D/3D split aspects
- Review for consistency of design approach in core aspects (Config/Class/Instantiate/Extend)
    - States
    - Components
    - Systems
    - Geometry
    - ...
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
