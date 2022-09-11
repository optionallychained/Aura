import { Model } from '../component/generic/model.component';
import { Shader } from '../component/generic/shader.component';
import { Texture } from '../component/generic/texture.component';
import { AuraError } from '../core/aura.error';
import { GameBase } from '../core/game.base';
import { VBOConfig } from '../renderer/vbo.config';
import { ShaderVariableResolver } from '../shader/shaderVariableResolver';
import { Entity } from './entity';
import { EntityManagerConfig } from './entity.manager.config';

/**
 * Abstract core EntityManager; implementing the abstractable behaviour for the management, update, retrieval and rendering of Entities
 *
 * Entities are any object existing in a Game's World, Text or UI
 *
 * Three concrete EntityManagers are utilised by the core Game - World for world objects, UI for ui elements and Text for strings. These
 *   are broken down into specific 2D and 3D variants for type safety in 2D and 3D Games
 *
 * Handles the management of Entity vertex lists, communicating with the Renderer to manage and draw scenes
 *
 * Receives and works with a single TextureAtlas, thereby allowing for texture sources per Entity use-case
 *
 * The concrete EntityManagers are available on the Game instance at `game.[world|ui|text]`
 *
 * @typeparam Config the configuration object type, extending the core EntityManagerConfig, used by concrete extensions
 */
export abstract class EntityManager<Config extends EntityManagerConfig> {

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
     * Constructor. Take the type-correct EntityManagerConfig, and initialise the Texture Atlas if provided
     *
     * @param config the type-correct EntityManagerConfig
     */
    constructor(protected readonly config: Config & { name: string }) {
        if (config.textureAtlas) {
            config.renderer.createTexture(config.textureAtlas);
        }
    }

    /**
     * Retrieve the number of Entities in play
     *
     * @returns the number of active Entities
     */
    public get entityCount(): number {
        return this.entities.length;
    }

    /**
     * Prepare an Entity to be added to the Game on the next frame
     *
     * @param entity the Entity to add
     */
    public addEntity(entity: Entity): void {
        this.addList.push(entity);
    }

    /**
     * Prepare a list of Entities to be added to the Game on the next frame
     *
     * @param entities the Entities to add
     */
    public addEntities(...entities: Array<Entity>): void {
        this.addList = this.addList.concat(entities);
    }

    /**
     * Prepare an Entity to be removed from the Game on the next frame
     *
     * @param entity the Entity to remove
     */
    public removeEntity(entity: Entity): void {
        this.removeList.push(entity);
    }

    /**
     * Prepare a list of Entities to be removed from the Game on the next frame
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
     * Frame update method. Process the Entity addList and removeList, then run all active Entities' frame update methods
     *
     * @param game the Game the EntityManager is running within
     * @param frameDelta the frame delta as calculated by the Game
     */
    public tick(game: GameBase, frameDelta: number): void {
        const added = this.loadEntities();
        const removed = this.cleanEntities();

        if (added || removed) {
            this.invalidateFilterCaches();
        }

        for (const e of this.entities) {
            e.tick(game, frameDelta);
        }
    }

    /**
     * Frame render method. Render all active and renderable Entities.
     *
     * Processes Entities grouped by shader+model combinations so as to reduce the amount of GL buffering required and render in batches
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
        return this.memoizeFilter(components.toString(), (e) => e.hasComponents(...components));
    }

    /**
     * Filter Entities from a given source by a given Component name. Filter results are cached to optimise frame-to-frame filters
     *
     * @param source the Entity list to treat as the filter source
     * @param filterId an identifier for the filter result, used to avoid conflicts for similar filters across disparate sources
     * @param components the name of the Component to filter by
     *
     * @returns the list of Entities from the source with the Component
     */
    public filterEntitiesByComponentNameFromSource(source: Array<Entity>, filterId: string, component: string): Array<Entity> {
        return this.memoizeFilter(component, (e) => e.hasComponent(component), filterId, source);
    }

    /**
     * Filter the Entities from a given source by a given list of Component names. Filter results are cached to optimise frame-to-frame
     *   filters
     *
     * @param source the Entity list to treat as the filter source
     * @param filterId an identifier for the filter result, used to avoid conflicts for similar filters across disparate sources
     * @param components the names of the Components to filter by
     *
     * @returns the list of Entities from the source with the Components
     */
    public filterEntitiesByComponentNamesFromSource(source: Array<Entity>, filterId: string, ...components: Array<string>): Array<Entity> {
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
     * @returns whether or not the Entity lists were changed, signalling the need to invalidate cached filters
     */
    private loadEntities(): boolean {
        if (this.addList.length) {
            const changes = new Set<string>();

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
     * @returns whether or not the Entity lists were changed, signalling the need to invalidate cached filters
     */
    private cleanEntities(): boolean {
        if (this.removeList.length) {
            const changes = new Set<string>();

            for (const e of this.removeList) {
                // TODO this might be a little hacky - if the Entity is not found, skip
                //   an Entity being on the removeList but not in the actual list of Entities may occur in very select circumstances, eg:
                //     - a game structure like a World Management System maintains a list of Entities
                //     - some of those Entities are removed by, say, a collision routine
                //     - the World Management System then tries to remove a set of Entities in batches
                //     - now, Entities which have already been removed are again on the removeList
                //   a better way of solving this might be desirable
                const index = this.entities.indexOf(e);
                if (index < 0) {
                    continue;
                }

                this.entities.splice(index, 1);

                // past this point, we're only concerned about keeping `renderableEntities` up to date - if the Entity to remove lacks a
                //   Shader or Model, it will not be tracked in that Map, so we can skip the below logic
                if (!e.hasComponent('Shader') || !e.hasComponent('Model')) {
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
                        // TODO related to above - here we don't error check for index not found, because in theory if the above passes
                        //   this one *should* exist
                        // when look at maybe resolving the above, look at this too

                        // remove the Entity from this shader+model group
                        forModel.splice(forModel.indexOf(e), 1);

                        // mark that the vertices for this shader+model combo should be recompiled
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
     * @param changes the set of shader+model combinations that were altered and require compiling
     */
    private compileVertices(changes: Set<string>): void {
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

                const vertices = new Float32Array(entities.length * vertexSize * vertexCount);
                let offset = 0;
                for (const e of entities) {
                    // offset trackers for combining slices of large array attribute arrays into interleaved buffers
                    const offsetTrackers = [];

                    for (let i = 0; i < vertexCount; i++) {
                        // process every attribute for every vertex of the Entity
                        for (let j = 0; j < shaderInfo.vertex.attributes.length; j++) {
                            const { name, size } = shaderInfo.vertex.attributes[j];
                            let value = ShaderVariableResolver.resolveAttribute(name, e);

                            if (typeof value === 'number') {
                                // handle numerical values by wrapping them in an array for setting into vertices
                                value = Float32Array.from([value]);
                            }
                            else if (size < value.length) {
                                // values that are larger than the actual attr size must be spliced into the vertex array in pieces to
                                //   produce interleaved buffers
                                // eg: a_Position - vertex positions are pulled from the geometry all at once, but only 2 or 3 are required
                                //   per step
                                if (offsetTrackers[j] === undefined) {
                                    offsetTrackers.push(0);
                                }

                                value = value.slice(offsetTrackers[j], offsetTrackers[j] += size);

                                if (name === 'a_TexCoord') {
                                    // texcoords supplied by geometry are defined as if sampling from a whole texture; their actual position
                                    //   in the atlas needs to be resolved
                                    const { textureAtlas } = this.config;

                                    if (!textureAtlas) {
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
                                    value = textureAtlas.resolveTextureCoordinates(value, column, row, columnSpan, rowSpan);
                                }
                            }

                            vertices.set(value, offset);
                            offset += size;
                        }
                    }
                }

                // create or update the VBO for later use in rendering these Entities
                this.vbos.set(vboIdentifier, {
                    name: vboName,
                    vertices,
                    verticesPerEntity: vertexCount,
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
     * Retrieve a set of Entities by filtering by the given predicate, caching the result to reduce frame-to-frame filtering operations
     *
     * Support filtering from a specific source as well as from all Entities, separating the two filter types to avoid set conflicts
     *
     * @param filter a string representation of the Entity filter, to be used as a cache key
     * @param predicate the filter predicate for matching Entities
     * @param filterId optional filter ID for sourced filters, to be used as a cache key extension. Must be provided for sourced filters
     * @param source the source to filter from, defaulting to the flat list of all Entities
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
     * Clear all filter caches in the event of an Entity list chang, ensuring that filters do not become out of date
     */
    private invalidateFilterCaches(): void {
        this.entityFilterCache.clear();
        this.sourcedEntityFilterCache.clear();
    }
}
