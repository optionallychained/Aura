# Core

Game representation.


## TODO

- If canvas parent provided but no size, infer from parent rather than from default sizing
- Improvements to destroy()
    - avoid need for optional chaining in internal references to canvas and other resources?
    - use profiling to arrive at a complete solution
    - actual teardown of WebGL resources in Renderer
