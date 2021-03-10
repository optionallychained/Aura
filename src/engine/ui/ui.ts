import { EntityManager, } from '../entity';
import { UIConfig } from './ui.config';

/**
 * Core UI class; providing utility and management for Entities representing UI elements
 *
 * // TODO continue on branch ui
 * // TODO this, World and Font might want to actually extend from EntityManager?
 */
export class UI extends EntityManager<UIConfig> {

    constructor(config: UIConfig) {
        super({
            name: 'ui',
            ...config
        });
    }
}
