# Aura2D

Aura2D is a general purpose TypeScript/WebGL game engine designed to facilitate the swift implementation of 2D browser games. It is the domain-specific 2D variant of [Aura](https://github.com/optionallychained/Aura), providing a swathe of utility, from standard geometries to generally-useful shaders to common game object components and systems.

Built according to the Entity-Component-System architecture with applications broken up into distinct states, Aura2D aims to enable a compartmentalised development approach, supporting developments of varying complexity with focus on getting prototypes off the ground fast.

While functional, Aura2D is very much a work-in-progress, made purely for fun and self-education.


## Documentation

*(Under Construction)* [Aura Documentation](https://optionallychained.github.io/Aura/)


## Getting Started


### Quickstart

For getting up and running with Aura2D fast with recommended configurations and example applications, see the [Aura2D template repository](https://github.com/optionallychained/Aura-Template-2D).


### NPM

- `npm i --save aura-2d`

It's recommended to write Aura2D applications in TypeScript and build with Webpack - though regular JS and other bundlers should work.


### CDN

```html
<script src="https://unpkg.com/aura-2d/_min/aura.2d.min.js"></script>
```

The minified Aura2D provides the library `Aura2D`. For example:

```html
<!DOCTYPE html>
<html>
    <body>
        <script src="https://unpkg.com/aura-2d/_min/aura.2d.min.js"></script>

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

Currently, for text rendering, Aura2D will require a `res/font.png` situated next to the application entry script. This is a uniform, one-dimensional texture atlas of characters for sampling onto in-game text.

Aura configures a default charset matching the example font found in [the Aura repository](https://github.com/optionallychained/Aura/blob/master/assets/font.png); for now, this should be copied into Aura projects (or an alternative atlas configured on the Game).

This is naturally subject to change with an upcoming overhaul to texture management and text rendering.
