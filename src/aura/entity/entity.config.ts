import { Component } from '../component/component';

/**
 * Interface describing an Entity Configuration object
 */
export interface EntityConfig {
    /** A human-readable tag for identifying the Entity */
    readonly tag: string;
    /** Components to initialise the Entity with, for convenient setup */
    readonly components?: ReadonlyArray<Component>;
}
