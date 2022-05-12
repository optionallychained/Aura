/**
 * Abstract Component; an object stored on an Entity providing data and/or behavior, enabling rendering and System operation on the Entity
 *
 * Concrete components should extend from this class and:
 *     - provide an easy-to-guess name via the constructor
 *     - be decorated with @Name, providing the same name
 * This facilitates class-based Component retrieval and filtering as well as instance-based introspection *
 *
 * Example Components include physics-related Transforms, rendering-related Shaders and Models and Colliders
 */
export abstract class Component implements Component {

    /**
     * Constructor. Take a name for the Component
     *
     * @param name the name of the Component
     */
    constructor(public readonly name: string) { }
}
