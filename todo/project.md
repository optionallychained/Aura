# Project TODOs

- [x] Initialise testing
- [x] ~~Structuring for publish~~
    - [x] ~~consider: barrels?~~
    - [x] ~~consider: compilation target? - ESM/Common/maybe even just publish-as-TS?~~
    - [x] ~~consider: relative vs absolute imports for engine/demo (paths/aliases)~~
    - [x] ~~want: tree shaking for demo/consumer build~~
- [ ] review barrelling approach
    - [ ] is it worth it for consumer imports?
    - [ ] does it cause issues with build optimisation? (ie do parts a game doesn't explicitly use end up in the package)
