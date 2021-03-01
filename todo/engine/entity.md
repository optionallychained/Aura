# Entity

- [ ] Game instance access for Entity tick?

- [ ] Self/"this" access for Entity tick?

- [ ] Multiple Entity Managers for disparate purposes - World, UI, Text?

- [x] **Consider/Experiment:** class/prototype-based getComponent/hasComponent

- [ ] **EntityManager optimisation**
    - [ ] Granular filter cache invalidation
    
    - [ ] **Consider/Experiment:** Entity Change Detection
        - [ ] ...entity-and/or-component based change detection + flagging
        - [ ] Granular vertex compilation w/ glBufferSubData()
        - [ ] Update Entity as necessary?
        - [ ] Render entire batches only as necessary?
        - [ ] ...memoization of EntityShaderMap value resolutions?

    - [ ] Potential optimisations alongside long-term WebGLRenderer to-dos

- [ ] **Consider/Experiment:** optimisations for Transform[2|3]D.compute()

- [ ] **Potentially:** "particles"
