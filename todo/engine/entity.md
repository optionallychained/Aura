# Entity

- [ ] Game instance access for Entity tick?

- [ ] Self/"this" access for Entity tick?

- [x] Multiple Entity Managers for disparate purposes - World, UI, Text?

- [x] **Consider/Experiment:** class/prototype-based getComponent/hasComponent

- [ ] **Consider/Experiment:** Entity construction-time error handling/verification?
    - ...should be possible by way of ShaderVariableResolver + knowledge of component requirements to ensure that an Entity can be rendered with a given configuration of Components incl. Shader/Model/Texture
    - ...might be an expensive operation if handled badly

- [ ] **Consider/Experiment:** "prefab Entities"
    - ...related to Entity Verification, maybe a good side-step would be to have built in Entity Types which intrinsically carry valid Component sets
    - ..."Renderable", "Textured", ...etc


- [ ] **Consider/Experiment:** optimisations for Transform[2|3]D.compute()

- [ ] **Potentially:** "particles"



- [ ] **EntityManager optimisation**
    - [ ] Granular filter cache invalidation
    
    - [ ] **Consider/Experiment:** Entity Change Detection
        - [ ] ...entity-and/or-component based change detection + flagging
        - [ ] Granular vertex compilation w/ glBufferSubData()
        - [ ] Update Entity as necessary?
        - [ ] Render entire batches only as necessary?
        - [ ] ...memoization of EntityShaderMap value resolutions?

    - [ ] Potential optimisations alongside long-term WebGLRenderer to-dos
