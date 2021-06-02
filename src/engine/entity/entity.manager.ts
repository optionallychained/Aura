import { Model, Shader, Texture } from '../component/generic';
import { AuraError, Game } from '../core';
import { VBOConfig } from '../renderer';
import { ShaderVariableResolver } from '../shader';
import { Entity } from './entity';
import { EntityManagerConfig } from './entity.manager.config';

/**
 * Internal-use utility type for representing Entity list change hints to the vertex compilation routine
 */
type EntityChanges = Set<string>;

/**
 * Abstract core EntityManager; implementing the generic and abstractable behaviour for the management, updating and rendering of Entities
 *
 * Three concrete EntityManagers are utilised by the core Game to manage World objects, UI objects and Font objects; separating processing
 *   and utility for the three distince use-cases for Entities. These are then broken down into 2D and 3D variants for the type correction
 *   of their consumer APIs
 *
 * Works to optimise Entity management and rendering by grouping Entities, precompiling vertex lists, handling VBOs and caching Entity
 *   filter/search results
 *
 * VBOs are provisioned on a per-shader+model combination basis. This is because Entities that share both a Shader and a Model can be
 *   rendered in batches, and thereby their vertices buffered  to the GPU and drawn from as a single set
 *
 * Receives and works with a single TextureAtlas, thereby allowing for texture sources per Entity use-case
 *
 * The concrete EntityManagers are available on the Game instance at `game.[world|ui|font]`
 *
 * @typeparam TConfig the configuration object type, extending the core EntityManagerConfig, used by concrete extensions
 *
 * @see Game
 * @see World
 * @see Font
 * @see UI
 */
export abstract class EntityManager<TConfig extends EntityManagerConfig> {

    /** Flat list of all Entities currently in play, used for efficiently executing frame ticks and in filtering */
    private entities: Array<Entity> = [];

    /** Entities with Shaders and Models, grouped by the same, used for optimising vertex compilation and gl API call handling */
    private readonly renderableEntities = new Map<string, Map<string, Array<Entity>>>();

    /** Flat list of Entities to be added on the next frame */
    private addList: Array<Entity> = [];

    /** Flat list of Entities to be removed on the next frame */
    private removeList: Array<Entity> = [];

    /** Map of VBOs constructed and used in rendering, used to reduce the number of vertex compilations for Entities and gl buffer calls */
    private readonly vbos = new Map<string, VBOConfig>();

    /** Cached Entity filters, used in optimising filters */
    private readonly entityFilterCache = new Map<string, Array<Entity>>();

    /**
     * Cached specific-source Entity filters, used in optimising filters from specific sources
     *
     * Separated from regular filters so as not to produce conflicts between similar filters of all Entities and subsets
     */
    private readonly sourcedEntityFilterCache = new Map<string, Array<Entity>>();

    /**
     * Constructor. Take and store the EntityManager's config, and initialise the Texture Atlas if provided
     *
     * @param renderer the renderer
     */
    constructor(protected readonly config: TConfig & { name: string }) {
        if (config.textureAtlas) {
            config.renderer.createTexture(config.textureAtlas);
        }
    }

    /**
     * Getter for the number of active Entities
     *
     * @returns the number of active Entities
     */
    public get entityCount(): number {
        return this.entities.length;
    }

    /**
     * Add an Entity to the addList, to be added to the game on the next frame
     *
     * @param entity the Entity to add
     */
    public addEntity(entity: Entity): void {
        this.addList.push(entity);
    }

    /**
     * Add a list of Entities to the addList, to be added to the game on the next frame
     *
     * @param entities the Entities to add
     */
    public addEntities(...entities: Array<Entity>): void {
        this.addList = this.addList.concat(entities);
    }

    /**
     * Add an Entity to the removeList, to be removed from the game on the next frame
     *
     * @param entity the Entity to remove
     */
    public removeEntity(entity: Entity): void {
        this.removeList.push(entity);
    }

    /**
     * Add a list of Entities to the removeList, to be removed from the game on the next frame
     *
     * @param entities the Entities to remove
     */
    public removeEntities(...entities: Array<Entity>): void {
        this.removeList = this.removeList.concat(entities);
    }

    /**
     * Purge all active Entities immediately
     */
    public clearEntities(): void {
        this.removeEntities(...this.entities);
        this.cleanEntities();
        this.invalidateFilterCaches();
    }

    /**
     * Frame update method. Augment the Entity list by processing the addList and removeList, then update all active Entities
     *
     * @param frameDelta the time between the last frame and the current, for normalizing time-dependent operations
     */
    public tick(game: Game, frameDelta: number): void {
        const added = this.loadEntities();
        const removed = this.cleanEntities();

        if (added || removed) {
            // TODO would be nice if we could detect and invalidate only those filter caches which will change based on the add/remove
            //   work relevant alongside Entity change detection optimisation for vertex compilation and buffering
            this.invalidateFilterCaches();
        }

        for (const e of this.entities) {
            e.tick(game, frameDelta);
        }
    }

    /**
     * Frame render method, called after tick so as to render all renderable active Entities
     *
     * Processes Entities grouped by given shader+model combinations so as to reduce the amount of GL buffering required and render all
     *   technically-similar Entities from a single vertex source
     *
     * // TODO draw order problem: since Entities are grouped, batches of same-shader+model Entities are rendered in the order new
     * //   new combinations were added to the game, instead of the order the Entities were added to the game. Tricky problem; want for a
     * //   way of defining a draw order from the outside maybe, but without undoing the optimisation that shader+model grouping represents
     */
    public render(): void {
        for (const [shaderName, forModel] of this.renderableEntities.entries()) {
            for (const [modelName, entities] of forModel) {
                // retrieve the VBO to use in rendering this Entity set
                const vbo = this.vbos.get(`${shaderName}_${modelName}`);

                if (entities.length && vbo) {
                    this.config.renderer.render({
                        vbo,
                        shaderProgramName: shaderName,
                        textureAtlasName: this.config.textureAtlas?.name,
                        entities
                    });

                    // reset the VBO's 'changed' configuration; in combo with (this).compileVertices(), works to limit the number of GL
                    //   buffer calls
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
    public filterEntitiesByComponentName(component: string): Array<Entity> {
        // TODO by class
        return this.memoizeFilter(component, (e) => e.hasComponent(component))
    }

    /**
     * Filter the active Entities by a given list of Component names. Filter results are cached to optimise frame-to-frame filters
     *
     * @param components the names of the Components to filter by
     *
     * @returns the list of Entities with the Components
     */
    public filterEntitiesByComponentNames(...components: Array<string>): Array<Entity> {
        // TODO by class
        return this.memoizeFilter(components.toString(), (e) => e.hasComponents(...components));
    }

    /**
     * Filter the Entities in a given source by a given list of Component names. Filter results are cached to optimise frame-to-frame
     *   filters
     *
     * @param source the Entity list to treat as the filter source
     * @param filterId an identifier for the filter result, used to avoid conflicts for similar filters across disparate sources
     * @param components the names of the Components to filter by
     *
     * @returns the list of Entities from the source with the Components
     */
    public filterEntitiesByComponentNamesFromSource(source: Array<Entity>, filterId: string, ...components: Array<string>): Array<Entity> {
        // TODO by class
        return this.memoizeFilter(components.toString(), (e) => e.hasComponents(...components), filterId, source);
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
     * Process the addList by adding Entities both to the grouped store and the flat store, facilitating both fast filters and efficient
     *   rendering
     *
     * @returns a boolean indicating whether or not the Entity lists were changed, signalling the need to invalidate cached filters
     */
    private loadEntities(): boolean {
        if (this.addList.length) {
            const changes: EntityChanges = new Set<string>();

            for (const e of this.addList) {
                if (!e.hasComponent('Shader') || !e.hasComponent('Model')) {
                    // grouped Entities are for optimising rendering; if an Entity lacks either a Shader or a Model, it is implicitly not
                    //   renderable
                    continue;
                }

                // get the shader and model name for provisioning vertices and VBOs
                const { programName } = e.getComponent<Shader>('Shader');
                const { modelName } = e.getComponent<Model>('Model');

                // mark that the vertices for this shader+model combo should be recompiled
                // TODO entity change detection: further optimise vertex compilation and buffering by recompiling and buffering on a per
                //   Entity basis
                changes.add(`${programName}-${modelName}`);

                // retrieve the existing Entities associated with this Shader
                let forShader = this.renderableEntities.get(programName);

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
                this.renderableEntities.set(programName, forShader);
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
            const changes: EntityChanges = new Set<string>();

            for (const e of this.removeList) {
                // remove the Entity from the flattened list to keep filters up to date
                this.entities.splice(this.entities.indexOf(e), 1);

                if (!e.hasComponent('Shader') || !e.hasComponent('Model')) {
                    // grouped Entities are for optimising rendering; if an Entity lacks either a Shader or a Model, it is implicitly not
                    //   renderable
                    continue;
                }

                // get the shader and model name for provisioning vertices and VBOs
                const { programName } = e.getComponent<Shader>('Shader');
                const { modelName } = e.getComponent<Model>('Model');

                // retrieve the Entities associated with this Shader
                const forShader = this.renderableEntities.get(programName);

                if (forShader) {
                    // retrieve the Entities associated with both this Shader and this Model
                    const forModel = forShader.get(modelName);

                    if (forModel) {
                        // remove the Entity from this shader+model group
                        forModel.splice(forModel.indexOf(e), 1);

                        // mark that the vertices for this shader+model combo should be recompiled
                        // TODO entity change detection: further optimise vertex compilation and buffering by recompiling and buffering on
                        //   a per Entity basis
                        changes.add(`${programName}-${modelName}`);

                        // delete the shader+model combo outright if it's now empty
                        if (!forModel.length) {
                            forShader.delete(modelName);
                        }

                        // delete the shader group container if it's now empty
                        if (!forShader.size) {
                            this.renderableEntities.delete(programName);
                        }
                    }
                }
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
     * // TODO entity change detection: further optimise vertex compilation and buffering by recompiling and buffering on a per
     * //   Entity basis
     *
     * @param changes the list of Shader+Model combinations that were altered and require compiling
     */
    private compileVertices(changes: EntityChanges): void {
        for (const change of changes) {
            const programName = change.substring(0, change.indexOf('-'));
            const modelName = change.substring(change.indexOf('-') + 1);

            // TODO if there's no Entity list under this combination, something has gone wrong? handle the issue?
            const entities = this.renderableEntities.get(programName)?.get(modelName);

            // identify a VBO by the shader+model combo it represents
            const vboIdentifier = `${programName}_${modelName}`;

            // name the VBO with this EntityManager instance's vboPrefix, facilitating multiple EntityManagers per Game instance
            const vboName = `${this.config.name}_${vboIdentifier}`;

            if (entities && entities.length) {
                // retrieve the existing VBO for this combo; if none exists, create one
                const existingVBO = this.vbos.get(vboIdentifier);

                if (!existingVBO) {
                    this.config.renderer.createVBO(vboName);
                }

                // pull out the shader and model info once from the first Entity, as they're guaranteed to be the same for all
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

                // track the offset for setting values into vertices
                let offset = 0;
                for (const e of entities) {
                    // track the offset for pulling positional data out of an Entity's Model's vertices
                    let p = 0;
                    // track the offset for pulling texture coordinate data out of an Entity's Model's texture coordinates
                    let t = 0;
                    for (let i = 0; i < vertexCount; i++) {
                        // process every attribute for every vertex of the Entity
                        for (const attr of shaderInfo.vertex.attributes) {
                            // TODO entity change detection: recompile dynamic values only as necessary
                            let value = ShaderVariableResolver.resolveAttribute(attr.name, e);

                            if (typeof value === 'number') {
                                // handle numerical values by wrapping them in an array for setting into vertices
                                value = Float32Array.from([value]);
                            }
                            else if (attr.name === 'a_Position') {
                                // handle positions by pulling out only *this* vertex's position from the Model's array
                                value = value.slice(p, p + attr.size);
                                p += attr.size;
                            }
                            else if (attr.name === 'a_TexCoord') {
                                // handle texture coordinates by asking the Texture Atlas to resolve this vertex's texcoord
                                const { textureAtlas } = this.config;

                                if (!textureAtlas) {
                                    // if we're trying to render an Entity with a Texture-involved shader, but we have no Texture Atlas,
                                    //   then something has gone wrong
                                    throw new AuraError({
                                        class: 'EntityManager',
                                        method: 'compileVertices',
                                        message: `
                                            Failed to render ${this.config.name} Entity '${e.tag}' with texture shader: No Texture Atlas
                                            was configured for ${this.config.name} Entities
                                        `
                                    });
                                }

                                const { column, row, columnSpan, rowSpan } = e.getComponent<Texture>('Texture');
                                value = textureAtlas.resolveTextureCoordinates(value.slice(t, t + 2), column, row, columnSpan, rowSpan);

                                // all texture coordinates are (currently?) of size 2
                                t += 2;
                            }

                            vertices.set(value, offset);

                            offset += attr.size;
                        }
                    }
                }

                // create or update the VBO for later use in rendering these Entities
                this.vbos.set(vboIdentifier, {
                    name: vboName,
                    vertices,
                    vertexCount,
                    vertexSize,
                    glShape,
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
     * Retrieve a set of Entities by filtering Entities by the given predicate, caching the result to reduce frame-to-frame filtering
     *   operations
     *
     * Support filtering from a specific source as well as from all Entities so as to facilitate multiple use cases
     *
     * Separate regular filters from sourced filters so as to avoid conflicts between similar filters of all Entities and subsets
     *
     * Further separate sourced filters from each other with a filterId so as to avoid conflicts between similar filters from disparate
     *   sources
     *
     * // TODO would be nice if we could detect and invalidate only those filter caches which will change based on add/remove
     * //   work relevant alongside Entity change detection optimisation for vertex compilation and buffering
     *
     * @param filter a string representation of the Entity filter, to be used as a cache key
     * @param predicate the filter predicate for matching Entities
     * @param filterId (optional) a filter ID for sourced filters, to be used as a cache key extension. Must be provided for sourced filters
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
     * Clear all filter caches in the event of an Entity list change by way of loadEntities or cleanEntities, ensuring that filters do not
     *   become out of date
     *
     * // TODO would be nice if we could detect and invalidate only those filter caches which will change based on add/remove
     * //   work relevant alongside Entity change detection optimisation for vertex compilation and buffering
     */
    private invalidateFilterCaches(): void {
        this.entityFilterCache.clear();
        this.sourcedEntityFilterCache.clear();
    }
}
