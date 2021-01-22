import { Component } from './component/component';

/**
 * Interface describing an Entity Configuration object
 */
export interface EntityConfig {
    /** A human-readable tag for identifying the Entity */
    tag: string;
    /** Entity frame tick function; none is provided by default */
    tick?: (frameDelta: number) => void;
    /** Components to initialise the Entity with, for convenient setup */
    components?: Component[];
}
