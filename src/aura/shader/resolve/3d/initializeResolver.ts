import { Transform } from '../../../component/3d/transform.component';
import { ShaderVariableResolver } from '../shaderVariableResolver';

/**
 * ShaderVariableResolver initialization routine for Aura3D; register attribute and uniform resolvers for 3D Component builtins
 *
 * Necessary with class-based Component management given that ShaderVariableResolver, as a shared export, no longer imports Components
 *   purely for type. Splitting concern-specific Component resolver imports re-enable selective Component packaging
 */
export const initializeResolver = (): void => {
    ShaderVariableResolver.registerEntityUniformResolver(
        'u_Transform',
        (e) => e.getComponent(Transform).compute().float32Array
    );
};