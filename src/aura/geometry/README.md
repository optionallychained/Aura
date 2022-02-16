# Geometry

Vertex implementations for use in Entity Model components.


## TODO


### General

- Index Arrays
- Reconsider Texture Coordinates as a required property
    - reason: texcoords may not make sense for lines (wireframes) and points
    - consider: texcoords optional => implicit constraint on Entity construction (Texture Component only compatible with Model w/ texcoords)
- Implement texcoords for all existing geometries
    - allow for texcoord overrides in conjunction with rework to system texture support? - especially relevant for 3D shapes...


### 2D

- Rhombus
- Kite


### 3D

- Pentagonal Prism
- Octagonal Prism
- Pentagonal Pyramid
- Octagonal Pyramid
- Cone
- Cylinder
- Sphere
- Icosahedron
- Dodecahedron
