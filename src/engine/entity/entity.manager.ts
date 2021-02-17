import { Model, Shader } from '../component';
import { UniformList, UniformSet, VBOConfig } from '../screen';
import { Entity } from './entity';
import { EntityManagerConfig } from './entity.manager.config';
import { EntityShaderMap } from './entityShaderMap';

/**
 * Internal-use utility type for representing Entity list change hints to the vertex compilation routine
 */
type EntityChanges = Array<{ shaderName: string, modelName: string }>;

/**
 * Core EntityManager; utilised by the Game to defer the management, updating and rendering of game Entities
 *
 * Works to optimise Entity management and rendering by grouping Entities, precompiling vertex lists, handling VBOs and memoizing Entity filter/search results
 *
 * VBOs are provisioned on a per-shader+model combination basis. This is because Entities that share both a Shader and a Model can be rendered in batches, and
 *   thereby their vertices buffered to the GPU and drawn from as a single set
 *
 * The EntityManager is available on the Game instance at `game.entityManager`
 *
 * @see Game
 */
export class EntityManager {

    /** Flat list of all Entities currently in play, used for efficiently executing frame ticks and in filtering */
    private entities: Array<Entity> = [];

    /** Entities with Shaders and Models, grouped by the same, used for optimising vertex and gl API call handling */
    private renderableEntities = new Map<string, Map<string, Array<Entity>>>();

    /** Flat list of Entities to be removed on the next frame */
    private removeList: Array<Entity> = [];

    /** Flat list of Entities to be added on the next frame */
    private addList: Array<Entity> = [];

    /** Map of VBOs constructed and used in rendering, used to reduce the number of vertex set compilations for Entities and gl buffer calls */
    private vbos = new Map<string, VBOConfig>();

    /** Cached Entity filters, used in optimising filters */
    private entityFilterCache = new Map<string, Array<Entity>>();

    /**
     * Cached specific-source Entity filters, used in optimising filters from specific sources
     *
     * Separated from regular filters so as not to produce conflicts between similar filters of all Entities and subsets
     */
    private sourcedEntityFilterCache = new Map<string, Array<Entity>>();

    /**
     * Constructor. Take and store the Game's Renderer instance
     *
     * @param renderer the renderer
     */
    constructor(private readonly config: EntityManagerConfig) { }

    /**
     * Getter for the number of active Entities
     *
     * @returns the number of active Entities
     */
    public get entityCount(): number {
        return this.entities.length;
    }

    /**
     * Add an Entity to the addList
     *
     * @param entity the Entity to add
     */
    public addEntity(entity: Entity): void {
        this.addList.push(entity);
    }

    /**
     * Add a list of Entities to the addList
     *
     * // TODO grouping of entities by component on add/remove for faster filtering?
     *
     * @param entities the Entities to add
     */
    public addEntities(...entities: Array<Entity>): void {
        this.addList = this.addList.concat(entities);
    }

    /**
     * Add an Entity to the removeList
     *
     * @param entity the Entity to remove
     */
    public removeEntity(entity: Entity): void {
        this.removeList.push(entity);
    }

    /**
     * Add a list of Entities to the removeList
     *
     * @param entities the Entities to remove
     */
    public removeEntities(...entities: Array<Entity>): void {
        this.removeList = this.removeList.concat(entities);
    }

    /**
     * Purge all active Entities by adding them to the removeList
     */
    public clearEntities(): void {
        this.removeEntities(...this.entities);
    }

    /**
     * Frame update method. Augment the Entity list by processing the addList and removeList, then update all active Entities
     *
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(frameDelta: number): void {
        const added = this.loadEntities();
        const removed = this.cleanEntities();

        if (added || removed) {
            this.invalidateFilterCaches();
        }

        for (const e of this.entities) {
            e.tick(frameDelta);
        }
    }

    /**
     * Frame render method, called after tick so as to render all renderable active Entities
     *
     * Processes Entities grouped by given shader+model combinations so as to reduce the amount of GL buffering required and render all technically-similar
     *   Entities from a single vertex source
     *
     * // TODO there will be an issue with draw order since same-shader+model additions are potentially added to a vbo rendered first
     * //   hmmmm
     */
    public render(): void {
        for (const [shaderName, forModel] of this.renderableEntities.entries()) {
            for (const [modelName, entities] of forModel) {
                // pluck out the renderables from the shader+model source
                // TODO EITHER will become unnecessary when automatic attr/uniform inference is in, OR will redefine the meaning of "renderable"
                const renderables = this.filterEntitiesByComponentsFromSource(entities, `${shaderName}_${modelName}`, 'Transform', 'Model', 'FlatColor', 'Shader');

                // retrieve the VBO to use in rendering this Entity set
                const vbo = this.vbos.get(`${shaderName}_${modelName}`);

                if (renderables.length && vbo) {
                    // pull out the shader info once from the first Entity, as the shader is guaranteed to be the same for all these renderables
                    const shaderInfo = entities[0].getComponent<Shader>('Shader');

                    // retrieve all the uniform keys from the shader info
                    const allUniforms = (shaderInfo.vertex.uniforms ?? []).concat(shaderInfo.fragment.uniforms);

                    // initialise the UniformSet for the render call as undefined
                    let uniformList: UniformSet | undefined;

                    if (allUniforms.length) {
                        // if there are uniforms to pipe, we need to build a UniformList so that the renderer can split draw calls accordingly
                        uniformList = [];

                        for (const e of renderables) {
                            const eUniforms: UniformList = [];

                            for (const uniform of allUniforms) {
                                // resolve the value of the uniform for this Entity and add it to the list
                                eUniforms.push({
                                    name: uniform.name,
                                    type: uniform.type,
                                    value: EntityShaderMap.getShaderValueForEntity(uniform.name, e)
                                });
                            }

                            // add the uniform list to the set
                            uniformList.push(eUniforms);
                        }
                    }

                    // render the set of renderable Entities
                    this.config.renderer.render({
                        uniforms: uniformList,
                        shaderProgramName: shaderName,
                        vbo
                    });

                    // reset the VBO's 'changed' configuration; in combo with (this).compileVertices(), works to limit the number of GL buffer calls
                    vbo.changed = false;
                }
            }
        }
    }

    /**
     * Filter the active Entities by a given Component name. Filter results are cached to optimise frame-to-frame filters
     *
     * @param component the name of the Component to filter by
     *
     * @returns the list of Entities with the Component
     */
    public filterEntitiesByComponent(component: string): Array<Entity> {
        return this.memoizeFilter(component, (e) => e.hasComponent(component))
    }

    /**
     * Filter the active Entities by a given list of Component names. Filter results are cached to optimise frame-to-frame filters
     *
     * @param components the names of the Components to filter by
     *
     * @returns the list of Entities with the Components
     */
    public filterEntitiesByComponents(...components: Array<string>): Array<Entity> {
        return this.memoizeFilter(components.toString(), (e) => e.hasComponents(components));
    }

    /**
     * Filter the Entities in a given source by a given list of Component names. Filter results are cached to optimise frame-to-frame filters
     *
     * @param source the Entity list to treat as the filter source
     * @param filterId an identifier for the filter result, used to avoid conflicts for similar filters across disparate sources
     * @param components the names of the Components to filter by
     *
     * @returns the list of Entities from the source with the Components
     */
    public filterEntitiesByComponentsFromSource(source: Array<Entity>, filterId: string, ...components: Array<string>): Array<Entity> {
        return this.memoizeFilter(components.toString(), (e) => e.hasComponents(components), filterId, source);
    }

    /**
     * Filter the active Entities by a given tag. Filter results are cached to optimise frame-to-frame filters
     *
     * @param tag the tag to filter by
     *
     * @returns the list of Entities with the tag
     */
    public filterEntitiesByTag(tag: string): Array<Entity> {
        return this.memoizeFilter(tag, (e) => e.tag === tag);
    }

    /**
     * Filter the active Entities by a given list of tags. Filter results are cached to optimise frame-to-frame filters
     *
     * @param tags the tags to filter by
     *
     * @returns the list of Entities with the tags
     */
    public filterEntitiesByTags(...tags: Array<string>): Array<Entity> {
        return this.memoizeFilter(tags.toString(), (e) => tags.includes(e.tag));
    }

    /**
     * Process the addList by adding Entities both to the grouped store and the flat store, facilitating both fast filters and efficient rendering
     *
     * @returns a boolean indicating whether or not the Entity lists were changed, signalling the need to invalidate cached filters
     */
    private loadEntities(): boolean {
        if (this.addList.length) {
            const changes: EntityChanges = [];

            for (const e of this.addList) {
                const shader = e.getComponent<Shader>('Shader');
                const model = e.getComponent<Model>('Model');

                // grouped Entities are for optimising rendering; if an Entity lacks either a Shader or a Model, it is implicitly not renderable
                if (!shader || !model) {
                    continue;
                }

                // get the shader and model name for provisioning vertices and VBOs
                const shaderName = shader.programName;
                const modelName = model.modelName;

                // mark that the vertices for this shader+model combo should be recompiled
                // TODO (later) - more intelligent change decection + vertex compilation; potentially on a per-Entity basis rather than per-combo; alongside
                //   GL sub-buffering?
                changes.push({ shaderName, modelName });

                // retrieve the existing Entities associated with this Shader
                let forShader = this.renderableEntities.get(shaderName);

                if (forShader) {
                    // retrieve the existing Entities associated with both this Shader and this Model
                    let forModel = forShader.get(modelName);

                    if (forModel) {
                        // add to the existing Entity list for this grouping
                        forModel.push(e);
                    }
                    else {
                        // initialise the Entity list for this grouping
                        forModel = [e];
                    }

                    // update the Shader grouping with the new per-Model Entity list
                    forShader.set(modelName, forModel);
                }
                else {
                    // no existing Entities for this Shader; initialise the grouping
                    forShader = new Map<string, Array<Entity>>();
                    forShader.set(modelName, [e]);
                }

                // update the main Entity Shader group with the new per-Shader Entity map
                this.renderableEntities.set(shaderName, forShader);
            }

            // compile the vertices for the altered groups
            this.compileVertices(changes);

            // maintain the flattened list of Entities for optimised filters
            this.entities = this.entities.concat(this.addList);

            // reset the addList
            this.addList = [];

            // return a filter cache invalidation signal
            return true;
        }

        // no changes occurred; do not return a cache invalidation signal
        return false;
    }

    /**
     * Clean the list of active Entities by removing all those in the removeList
     *
     * @returns a boolean indicating whether or not the Entity lists were changed, signalling the need to invalidate cached filters
     */
    private cleanEntities(): boolean {
        if (this.removeList.length) {
            const changes: EntityChanges = [];

            for (const e of this.removeList) {
                const shader = e.getComponent<Shader>('Shader');
                const model = e.getComponent<Model>('Model');

                // grouped Entities are for optimising rendering; if an Entity lacks either a Shader or a Model, it will not be in the renderableEntities group
                if (!shader || !model) {
                    continue;
                }

                // get the shader and model name for provisioning vertices and VBOs
                const shaderName = shader.programName;
                const modelName = model.modelName;

                // retrieve the Entities associated with this Shader
                const forShader = this.renderableEntities.get(shaderName);

                if (forShader) {
                    // retrieve the Entities associated with both this Shader and this Model
                    const forModel = forShader.get(modelName);

                    if (forModel) {
                        // remove the Entity from this shader+model group
                        forModel.splice(forModel.indexOf(e), 1);

                        // mark that the vertices for this shader+model combo should be recompiled
                        // TODO (later) - more intelligent change decection + vertex compilation; potentially on a per-Entity basis rather than per-combo; alongside
                        //   GL sub-buffering?
                        changes.push({ shaderName, modelName });

                        // delete the shader+model combo outright if it's now empty
                        if (!forModel.length) {
                            forShader.delete(modelName);
                        }

                        // delete the shader group container if it's now empty
                        if (!forShader.size) {
                            this.renderableEntities.delete(shaderName);
                        }
                    }
                }

                // remove the Entity from the flattened list to keep filters up to date
                this.entities.splice(this.entities.indexOf(e), 1);
            }

            // compile the vertices for the altered groups
            this.compileVertices(changes);

            // reset the removeList
            this.removeList = [];

            // return a filter cache invalidation signal
            return true;
        }

        // no changes occurred; do not return a cache invalidation signal
        return false;
    }

    /**
     * Compile any vertex lists and update relevant VBOs for a given set of shader+model combinations altered in Entity list changes
     *
     * // TODO (later) - more intelligent change decection + vertex compilation; potentially on a per-Entity basis rather than per-combo; alongside
     *     GL sub-buffering?
     *
     * @param changes the list of Shader+Model combinations that were altered and require compiling
     */
    private compileVertices(changes: EntityChanges): void {
        for (const { shaderName, modelName } of changes) {
            // TODO if there's no Entity list under this combination, something has gone wrong? handle the issue?
            const entities = this.renderableEntities.get(shaderName)?.get(modelName);

            // identify a VBO by the shader+model combo it represents
            const vboIdentifier = `${shaderName}_${modelName}`;

            // name the VBO with this EntityManager instance's vboPrefix, facilitating multiple EntityManagers per Game instance
            const vboName = `${this.config.vboPrefix}_${vboIdentifier}`;

            if (entities && entities.length) {
                // retrieve the existing VBO for this combo; if none exists, create one
                const existingVBO = this.vbos.get(vboIdentifier);

                if (!existingVBO) {
                    this.config.renderer.createVBO(vboName);
                }

                // pull out the shader and model info once from the first Entity, as they're guaranteed to be the same for all these Entities
                const shaderInfo = entities[0].getComponent<Shader>('Shader');
                const modelInfo = entities[0].getComponent<Model>('Model');

                // retrieve nominal information relating to all the Entities
                const { glShape, vertexCount } = modelInfo;

                // the vertex size is the size of all attributes required by the shader added together
                // TODO this reduce call is a little clumsy but it works for now
                const vertexSize = Object.values(shaderInfo.vertex.attributes).reduce((prev, current) => {
                    return {
                        name: current.name,
                        size: prev.size + current.size
                    };
                }).size;

                // initialise the Float32Array; its size is the number of entities multiplied by the size and count of their vertices
                const stride = vertexSize * vertexCount;
                const vertices = new Float32Array(entities.length * stride);

                let offset = 0;
                for (const e of entities) {
                    for (const attr of shaderInfo.vertex.attributes) {
                        // TODO recompilation of dynamic values as part of Entity change detection/sub-buffering/etc optimisations
                        let value = EntityShaderMap.getShaderValueForEntity(attr.name, e);

                        if (typeof value === 'number') {
                            value = Float32Array.from([value]);
                        }

                        vertices.set(value, offset);

                        offset += stride;
                    }
                }

                // create or update the VBO for later use in rendering these Entities
                this.vbos.set(vboIdentifier, {
                    name: vboName,
                    vertices,
                    vertexCount,
                    vertexSize,
                    glShape,
                    // set the VBO's changed flag to ensure data is rebuffered to the GPU later on
                    changed: true
                });
            }
            else {
                // if there are no Entities for a given shader+model combo, delete the associated VBO
                this.config.renderer.deleteVBO(vboName);
                this.vbos.delete(vboIdentifier);
            }
        }
    }

    /**
     * Retrieve a set of Entities by filtering Entities by the given predicate, caching the result to reduce frame-to-frame filtering operations
     *
     * Support filtering from a specific source as well as from all Entities so as to facilitate multiple use cases
     *
     * Separate regular filters from sourced filters so as to avoid conflicts between similar filters of all Entities and subsets
     *
     * Further separate sourced filters from each other with a filterId so as to avoid conflicts between similar filters from disparate sources
     *
     * // TODO filters may become out of date due to the single listChanged flag; maybe best to have an 'invalidate' flag on caches
     *
     * @param filter a string representation of the Entity filter
     * @param predicate the filter predicate for matching Entities
     * @param filterId an optional filter ID for separating similar filters from disparate sources. Must be provided for sourced filters
     * @param source the source to filter from; defaulting to the flat list of all Entities
     *
     * @returns the array of Entities matching the filter
     */
    private memoizeFilter(filter: string, predicate: (e: Entity) => boolean, filterId?: string, source = this.entities): Array<Entity> {
        let filterCache = this.entityFilterCache;

        if (filterId) {
            // handle sourced filters by changing the cache target and filter name
            filter = `${filter}_${filterId}`;
            filterCache = this.sourcedEntityFilterCache;
        }

        let list = filterCache.get(filter);

        if (!list) {
            list = source.filter(predicate);
            filterCache.set(filter, list);
        }

        return list;
    }

    /**
     * Clear all filter caches in the event of an Entity list change by way of loadEntities or cleanEntities, ensuring that filters do not become out of date
     *
     * // TODO test the efficiency of this in practice; consider specific invalidation if possible/necessary
     */
    private invalidateFilterCaches(): void {
        this.entityFilterCache.clear();
        this.sourcedEntityFilterCache.clear();
    }
}
