import { FlatColor, Model, Shader, Transform } from '../component';
import { GLShape } from '../geometry';
import { WebGLRendererConfig } from '../screen';
import { UniformType } from '../shader/uniformType';
import { Entity } from './entity';
import { EntityManagerConfig } from './entity.manager.config';

/**
 * Core EntityManager; utilised by the Game to defer the management, updating and rendering of all game Entities
 *
 * Includes Entity filtering methods for retrieval of Entities by various search metrics
 *
 * The EntityManager is available on the Game instance at `game.entityManager`
 *
 * @see Game
 */
export class EntityManager {

    /** List of Entities currently in play */
    private entities: Array<Entity> = [];

    // entities grouped by shader name and then by model name
    private groupedEntities = new Map<string, Map<string, Array<Entity>>>();

    /** List of Entities to be removed on the next frame */
    private removeList: Array<Entity> = [];

    /** List of Entities to be added on the next frame */
    private addList: Array<Entity> = [];

    /** Name of the VBO the EntityManager will use for GPU bound data */
    private VBOName = 'EntityVBO';

    private VBONames = new Map<string, string>();

    private vbos = new Map<string, WebGLRendererConfig['vbo']>();

    /** Flag for determining whether or not the Entity list has changed; for optimising filters */
    private listChanged = false;

    /** Memoized Entity-by-Component filters; for optimising filters */
    private componentFilters = new Map<string, Array<Entity>>();

    /** Memoized Entity-by-Tag filters; for optimising filters */
    private tagFilters = new Map<string, Array<Entity>>();

    /**
     * Constructor. Take and store the Game's Renderer instance
     *
     * @param renderer the renderer
     */
    constructor(private readonly config: EntityManagerConfig) { }

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
        this.listChanged = false;
        this.loadEntities();
        this.cleanEntities();

        for (const e of this.entities) {
            e.tick(frameDelta);
        }
    }

    /**
     * Frame render method, called after tick so as to render all renderable active Entities
     */
    public render(): void {
        for (const [shaderName, forModel] of this.groupedEntities.entries()) {

            for (const [modelName, entities] of forModel) {
                // TODO reimplement filtering
                const renderables = entities.filter((e) => e.hasComponents(['Transform', 'Model', 'FlatColor', 'Shader']));

                if (renderables.length) {

                    const vbo = this.vbos.get(`${shaderName}_${modelName}`);

                    if (vbo) {
                        const uniforms: WebGLRendererConfig['uniforms'] = [];

                        for (const e of renderables) {
                            const transform = e.getComponent<Transform>('Transform');
                            const flatColor = e.getComponent<FlatColor>('FlatColor');

                            // TODO uniform compilation by shaderProgram->uniforms
                            uniforms.push({
                                u_Transform: {
                                    type: UniformType.MAT3,
                                    value: transform.transform.float32Array
                                },
                                u_Color: {
                                    type: UniformType.VEC4,
                                    value: flatColor.color.float32Array
                                }
                            })
                        }

                        this.config.renderer.render({
                            uniforms,
                            shaderProgramName: shaderName,
                            vbo
                        });

                        vbo.changed = false;
                    }
                }
            }
        }
    }

    /**
     * Filter the active Entities by a given Component name
     *
     * // TODO by Component class?
     *
     * @param component the (name of the) Component to filter by
     *
     * @returns the list of Entities with the Component
     */
    public filterEntitiesByComponent(component: string): Array<Entity> {
        return this.memoizeFilter(this.componentFilters, component, (e) => e.hasComponent(component))
    }

    /**
     * Filter the active Entities by a given list of Component names
     *
     * // TODO by Component class?
     *
     * @param components the (names of the) Components to filter by
     *
     * @returns the list of Entities with the Components
     */
    public filterEntitiesByComponents(components: Array<string>): Array<Entity> {
        return this.memoizeFilter(this.componentFilters, components.toString(), (e) => e.hasComponents(components));
    }

    /**
     * Filter the active Entities by a given tag
     *
     * @param tag the tag to filter by
     *
     * @returns the list of Entities with the tag
     */
    public filterEntitiesByTag(tag: string): Array<Entity> {
        return this.memoizeFilter(this.tagFilters, tag, (e) => e.tag === tag);
    }

    /**
     * Filter the active Entities by a given list of tags
     *
     * @param tags the tags to filter by
     *
     * @returns the list of Entities with the tags
     */
    public filterEntitiesByTags(tags: Array<string>): Array<Entity> {
        return this.memoizeFilter(this.tagFilters, tags.toString(), (e) => tags.includes(e.tag));
    }

    /**
     * Retrieve the number of active Entities
     *
     * @returns the number of active Entities
     */
    public countEntities(): number {
        return this.entities.length;
    }

    /**
     * Populate the addList into the list of active Entities
     *
     * // TODO grouping of entities by component on add/remove for faster filtering?
     */
    private loadEntities(): void {
        if (this.addList.length) {
            const changes: Array<{ shaderName: string, modelName: string }> = [];

            for (const e of this.addList) {
                const shader = e.getComponent<Shader>('Shader');
                const model = e.getComponent<Model>('Model');

                let shaderName = 'none';
                let modelName = 'none';

                if (shader) {
                    shaderName = shader.program.name;
                }
                if (model) {
                    modelName = model.modelName;
                }

                // mark the changes for recompiling the vertices for this shader+model combo
                changes.push({ shaderName, modelName });

                let forShader = this.groupedEntities.get(shaderName);

                if (forShader) {
                    let forModel = forShader.get(modelName);

                    if (forModel) {
                        forModel.push(e);
                    }
                    else {
                        forModel = [e];
                    }

                    forShader.set(modelName, forModel);
                }
                else {
                    forShader = new Map<string, Array<Entity>>();
                    forShader.set(modelName, [e]);
                }

                this.groupedEntities.set(shaderName, forShader);
            }

            this.compileVertices(changes);

            this.entities = this.entities.concat(this.addList);

            this.addList = [];
            this.listChanged = true;
        }
    }

    private compileVertices(changes: Array<{ shaderName: string, modelName: string }>): void {
        for (const { shaderName, modelName } of changes) {
            const entities = this.groupedEntities.get(shaderName)?.get(modelName);

            if (entities) {
                const vboIdentifier = `${shaderName}_${modelName}`;
                const vboName = `${this.config.vboPrefix}_${vboIdentifier}_vbo`;

                const existingVBO = this.vbos.get(vboIdentifier);

                if (!existingVBO) {
                    this.config.renderer.createVBO(vboName);
                }

                let vertices: Array<number> = [];
                let vertexCount = 0;
                let vertexSize = 0;
                let glShape: GLShape = 0;

                for (const e of entities) {
                    const model = e.getComponent<Model>('Model');
                    const shader = e.getComponent<Shader>('Shader');

                    for (const vertex of model.vertices) {
                        vertices = vertices.concat(vertex.array);
                    }

                    // TODO this is guaranteed to be the same for each model; make that clearer somehow?
                    glShape = model.glShape;
                    vertexSize = Object.values(shader.program.vertex.attributes).reduce((prev, current) => prev + current);
                    vertexCount = model.vertCount;

                    // TODO vertex compilation by attributes (eg attr color)
                }

                this.vbos.set(vboIdentifier, {
                    name: vboName,
                    vertices: Float32Array.from(vertices),
                    vertexCount,
                    vertexSize,
                    glShape,
                    changed: true
                });
            }
        }
    }

    /**
     * Clean the list of active Entities by removing all those in the removeList
     *
     * // TODO grouping of entities by component on add/remove for faster filtering?
     */
    private cleanEntities(): void {
        if (this.removeList.length) {
            for (const e of this.removeList) {
                // const shader = e.getComponent<Shader>('Shader');
                // let name;

                // if (shader) {
                //     name = shader.programName;
                // }
                // else {
                //     name = 'none';
                // }

                // let list = this.groupedEntities.get(name);

                // if (list) {
                //     list = list.splice(list.indexOf(e), 1);

                //     this.groupedEntities.set(name, list);
                // }
                // else {
                //     // this shouldn't happen?
                // }

                // this.entities.splice(this.entities.indexOf(remove), 1);
            }

            this.removeList = [];
            this.listChanged = true;
        }
    }

    /**
     * Retrieve a set of Entities by filtering active Entities by the given predicate, caching the result
     *
     * Skip filtering if a cache exists for the given filter and no changes have been made to the active Entity list
     *
     * @param cache the cache (a map of filter => Entity[]) to utilise
     * @param filter a string representation of the Entity filter
     * @param predicate the filter predicate for matching Entities
     *
     * @returns the array of Entities matching the filter
     */
    private memoizeFilter(cache: Map<string, Array<Entity>>, filter: string, predicate: (e: Entity) => boolean): Array<Entity> {
        let list = cache.get(filter);

        if (this.listChanged || !list) {
            list = this.entities.filter(predicate)
            cache.set(filter, list);
        }

        return list;
    }
}
