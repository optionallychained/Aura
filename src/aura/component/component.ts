/**
 * Abstract class defining a Component; an object stored on an Entity providing data and behaviour enabling the operation of Systems on the
 *   Entity
 *
 * All Components should extend from this class and provide an easy-to-guess and sensible name (eg. Transform2D => 'Transform2D')
 *
 * Example Components include physics-related Transforms, rendering-related Shaders and Models, Colliders and more
 *
 * @see Entity
 */
export abstract class Component {

    /**
     * Constructor. Take and store a name for this Component
     *
     * @param name the name of the Component
     */
    constructor(public readonly name: string) { }
}
