/**
 * Enum standardising the specification of Shader uniform 'variation' hints
 *
 * Uniform 'variation' is a special field which determines both how often a uniform will vary, and how it can be retrieved by the Renderer:
 *   - STATIC - unassociated with Entities, retrievable from the Game and to be uploaded once per render call
 *   - ENTITY - associated with Entities, retrievable from each Entity to be rendered and uploaded once per draw call
 */
export enum UniformVariation {
    STATIC = 'static',
    ENTITY = 'entity'
}
