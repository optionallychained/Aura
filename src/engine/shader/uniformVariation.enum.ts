/**
 * Enum standardising the specification of Shader uniform 'variation' hints
 *
 * Uniform 'variation' is a designation of how often a uniform's value may change and thereby how often it must be resolved and uploaded to
 *   the GFX by the Renderer.
 *
 * A value of 'STATIC' indicates that a uniform varies once per render() call
 *   - example: the Projection Matrix as specified/required by a Vertex Shader
 *
 * A value of 'ENTITY' indicates that a uniform varies once per rendered Entity
 *   - example: an Entity's Transformation Matrix as specified/required by a Vertex Shader
 *   - example: an Entity's FlatColor as specified/required by a Fragment Shader
 */
export enum UniformVariation {
    STATIC = 'static',
    ENTITY = 'entity'
}
