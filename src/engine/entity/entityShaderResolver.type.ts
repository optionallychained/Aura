import { Entity } from './entity';

/**
 * Utility type representing an EntityShaderMap attribute/uniform value resolution method
 */
export type EntityShaderResolver = (e: Entity) => Float32Array | number;
