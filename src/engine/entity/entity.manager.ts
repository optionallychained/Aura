import { FlatColor, Model, Shader, Transform } from '../component';
import { WebGLRenderer } from '../screen';
import { Entity } from './entity';

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
    private entities: Entity[] = [];

    /** List of Entities to be removed on the next frame */
    private removeList: Entity[] = [];

    /** List of Entities to be added on the next frame */
    private addList: Entity[] = [];

    private VBOName = 'EntityVBO';

    /**
     * Constructor. Take and store the Game's Renderer instance
     *
     * @param renderer the renderer
     */
    constructor(private renderer: WebGLRenderer) {
        renderer.createVBO(this.VBOName);
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
    public addEntities(...entities: Entity[]): void {
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
    public removeEntities(...entities: Entity[]): void {
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
        if (this.addList.length) {
            this.loadEntities();
        }
        if (this.removeList.length) {
            this.cleanEntities();
        }

        for (const e of this.entities) {
            e.tick(frameDelta);
        }
    }

    /**
     * Frame render method, called after tick so as to render all renderable active Entities
     *
     * // TODO smart momoization of renderables so as to reduce filtering operations when no changes occur frame-to-frame
     */
    public render(): void {
        // to render, an Entity must have a Transform (position and dimensions within the world) and (for now) a FlatColor
        const renderables = this.filterEntitiesByComponents(['Transform', 'Model', 'Shader', 'FlatColor']);

        for (const e of renderables) {
            const transform = e.getComponent<Transform>('Transform');
            const model = e.getComponent<Model>('Model');
            const shader = e.getComponent<Shader>('Shader');
            const flatColor = e.getComponent<FlatColor>('FlatColor');

            let vertices: number[] = [];

            for (const v of model.vertices) {
                vertices = vertices.concat(v.array);
            }

            this.renderer.render({
                VBOName: this.VBOName,
                shaderProgramName: shader.programName,
                vertices: Float32Array.from(vertices),
                glShape: model.glShape,
                // TODO temporary
                attributes: {
                    a_Position: 2
                },
                uniforms: {
                    u_Transform: {
                        type: 'mat3',
                        value: transform.transform.float32Array
                    },
                    u_Color: {
                        type: 'vec4',
                        value: flatColor.color.float32Array
                    }
                },
                vertSize: model.vertSize,
                vertCount: model.vertCount
            });
        }
    }

    /**
     * Filter the active Entities by a given Component name
     *
     * // TODO by Component class?
     *
     * // TODO smart momization of previous searches so as to reduce filtering operations for common frame-by-frame filters?
     *
     * @param component the (name of the) Component to filter by
     *
     * @returns the list of Entities with the Component
     */
    public filterEntitiesByComponent(component: string): Entity[] {
        return this.entities.filter((e) => e.hasComponent(component));
    }

    /**
     * Filter the active Entities by a given list of Component names
     *
     * // TODO by Component class?
     *
     * // TODO smart momization of previous searches so as to reduce filtering operations for common frame-by-frame filters?
     *
     * @param components the (names of the) Components to filter by
     *
     * @returns the list of Entities with the Components
     */
    public filterEntitiesByComponents(components: string[]): Entity[] {
        return this.entities.filter((e) => e.hasComponents(components));
    }

    /**
     * Filter the active Entities by a given tag
     *
     * // TODO smart momization of previous searches so as to reduce filtering operations for common frame-by-frame filters?
     *
     * @param tag the tag to filter by
     *
     * @returns the list of Entities with the tag
     */
    public filterEntitiesByTag(tag: string): Entity[] {
        return this.entities.filter((e) => e.tag === tag);
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
        this.entities = this.entities.concat(this.addList);
        this.addList = [];
    }

    /**
     * Clean the list of active Entities by removing all those in the removeList
     *
     * // TODO grouping of entities by component on add/remove for faster filtering?
     */
    private cleanEntities(): void {
        for (const remove of this.removeList) {
            this.entities.splice(this.entities.indexOf(remove), 1);
        }
        this.removeList = [];
    }
}
