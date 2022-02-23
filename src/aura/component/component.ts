/**
 * Abstract Component; an object stored on an Entity providing data and/or behavior, enabling rendering and System operation on the Entity
 *
 * Concrete Components should extend from this class and provide an easy-to-guess name (eg Transform -> 'Transform')
 *
 * Example Components include physics-related Transforms, rendering-related Shaders and Models and Colliders
 */
export abstract class Component {

    /**
     * Constructor. Take a name for the Component
     *
     * @param name the name of the Component
     */
    constructor(public readonly name: string) { }
}
