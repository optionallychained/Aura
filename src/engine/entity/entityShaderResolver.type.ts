import { Entity } from './entity';

export type EntityShaderResolver = (e: Entity) => Float32Array | number;
