import { Component } from './component/component';

export interface EntityConfig {
    tag: string;
    tick?: (frameDelta: number) => void;
    components?: Component[];
}
