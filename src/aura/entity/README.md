# Entity

Game Object representation and management.


## TODO


### Entity

- Find a way to reimplement class/type-based Component get/remove/has (see bottom of entity.ts) (drop 'name' entirely?)
- Consider "prefab" Entities, comprising common Component groupings
- Consider Entity "validation"
    - Construct-time assurance than an Entity's component configuration works
    - eg: has all the Components required to fill its Shader's Attributes


### EntityManager

- General rework of Entity vertex data management
    - Index Arrays (associated: Geometry)
    - Reconsider shader<->model Entity grouping (associated: Materials?)
        - solve draw order problem (drawn by group add order, not by entity add order) / allow for draw order overrides
    - Buffer positional data and attributes separately?
    - compile/buffer only as appropriate rather than in full batches
        - Entity add/remove: insert new data into existing groupings rather than recompiling the whole set
        - Entity attribute change (eg FlatColor update): sub buffering (+ detection?)
- Improvements to filter caching
    - Granular cache invalidation for optimising Entity add/remove?
    - filter by Component class/type
