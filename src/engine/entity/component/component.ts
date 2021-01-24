/**
 * Abstract class defining a Component; an object stored on an Entity providing data and behaviour enabling the operation of Systems on the Entity.
 *
 * All Components should extend from this class and provide an easy-to-guess and sensible name (eg. Transform => 'Transform').
 *
 * Example Components include physics-related Transforms, rendering-related Colors and Geometry, and Collision Boxes.
 *
 * @see Entity
 */
export abstract class Component {

    /**
     * Constructor. Take and store a name for this Component
     *
     * @param name the name of the Component
     */
    constructor(protected name: string) { }

    /**
     * Getter for the Component name
     *
     * @returns the Component's name
     */
    public getName(): string {
        return this.name;
    }
}
