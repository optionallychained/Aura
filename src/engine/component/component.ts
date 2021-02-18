/**
 * Abstract class defining a Component; an object stored on an Entity providing data and behaviour enabling the operation of Systems on the
 *   Entity
 *
 * All Components should extend from this class and provide an easy-to-guess and sensible name (eg. Transform => 'Transform')
 *
 * Example Components include physics-related Transforms, rendering-related Colors and Geometry, and Collision Boxes
 *
 * // TODO move away from class extension for COmponents in place of a ComponentConfig type approach?
 * //   - implementation of Components becomes a little less naturally-readable, but it fits the approach of the rest of the engine...
 * //   - also consider this for Systems
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
