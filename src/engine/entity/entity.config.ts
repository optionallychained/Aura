import { Component } from '../component';

/**
 * Interface describing an Entity Configuration object
 */
export interface EntityConfig {
    /** A human-readable tag for identifying the Entity */
    readonly tag: string;
    /** Components to initialise the Entity with, for convenient setup */
    readonly components?: ReadonlyArray<Component>;
    /** Entity frame tick function; none is provided by default */
    readonly tick?: (frameDelta: number) => void;
}
