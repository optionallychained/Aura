import { Entity } from '../entity/entity';

/**
 * Utility type representing an EntityShaderMap attribute/uniform value resolution method
 */
export type EntityShaderVariableResolver = (e: Entity) => Float32Array | number;
