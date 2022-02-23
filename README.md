# Aura

[![NPM @aura/2d badge](https://badge.fury.io/js/@aura/2d.svg)](https://badge.fury.io/js/@aura/2d)
[![NPM @aura/3d badge](https://badge.fury.io/js/@aura/3d.svg)](https://badge.fury.io/js/@aura/3d)

Aura is a general purpose TypeScript/WebGL game engine designed to facilitate the swift implementation of both 2D and 3D browser games. Published as two distinct packages - `@aura/2d` and `@aura/3d` - each variant provides a swathe of domain-specific utility, from standard geometries to generally-useful shaders to common game object components and systems.

Built according to the Entity-Component-System architecture with applications broken up into distinct states, Aura aims to enable a compartmentalised development approach, supporting developments of varying complexity with focus on getting prototypes off the ground fast.

While functional, Aura is very much a work-in-progress, made purely for fun and self-education.


## Repository

This repository serves as a master project producing both the Aura2D and Aura3D variants, where domain-specific implementations inherit from a generalised and shared core. 2D and 3D use cases are split to optimise application build sizes and homogenise development experiences, reducing clutter and allowing for contextually-appropriate type safety as well as consistent, to-purpose and intuitive APIs and documentation.

| Directory     | Contents                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `./scripts`   | documentation and package generation utilities                                                                |
| `./src/app2d` | demo/test application emulating Aura2D developments; a test bed for ongoing Aura works                        |
| `./src/app3d` | as app2d for Aura3D                                                                                           |
| `./src/aura`  | Aura itself, with domain-specific implementations found in `**/2d/` and `**/3d/` directories                  |
| `./src/docs`  | Pug-based documentation site, combined with typedoc API docs in final documentation output                    |
| `./src/test`  | Jest tests for Aura                                                                                           |


## Documentation

*(Under Construction)* [Aura Documentation](https://optionallychained.github.io/Aura/)


## Getting Started


### Quickstart

For getting up and running with Aura fast with recommended configurations and example applications, see the following template repositories:
- [Aura-Template-2D](https://github.com/optionallychained/Aura-Template-2D)
- [Aura-Template-3D](https://github.com/optionallychained/Aura-Template-3D)


### NPM

- `npm i @aura/2d`
- `npm i @aura/3d`

It's recommended to write Aura applications in TypeScript and build with Webpack - though regular JS and other bundlers should work.


### CDN

```html
<script src="https://unpkg.com/@aura/2d/_min/aura.2d.min.js"></script>
```
```html
<script src="https://unpkg.com/@aura/3d/_min/aura.3d.min.js"></script>
```

Minified scripts provide the libraries `Aura2D` and `Aura3D`. For example:

```html
<!DOCTYPE html>
<html>
    <body>
        <script src="https://unpkg.com/@aura/2d/_min/aura.2d.min.js"></script>

        <script>
            const { Game, State, Vec2 } = Aura2D;

            const game = new Game({ canvasDimensions: new Vec2(1024, 768) });

            game.addState(new State({ name: 'example', init: () => console.log('Aura2D'), tick: () => {} }));

            game.start('example');
        </script>
    </body>
</html>
```


### Note for Text Rendering

Currently, for text rendering, Aura will require a `res/font.png` situated next to the application entry script. This is a uniform, one-dimensional texture atlas of characters for sampling onto in-game text.

Aura configures a default charset matching the example font found in `./assets/font.png`; for now, this should be copied into Aura projects (or an alternative atlas configured on the Game).

This is naturally subject to change with an upcoming overhaul to texture management and text rendering.
