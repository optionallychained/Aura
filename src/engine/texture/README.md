# Texture

Texture representation.


## TODO

- take a second look at resolveTextureCoordinates()
- per-face texture sampling for 3D
- Reconsider entire texture implementation (current 3 fixed atlas approach is inflexible and weird)
    - non-uniform atlases
    - named atlas cells
    - 3D textures (cube maps?)
    - per-Entity textures (associated: Materials?)
    - configurable texParameter*()
    - look at u_Texture hack in Renderer
