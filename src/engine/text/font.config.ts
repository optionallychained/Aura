import { EntityManagerConfig } from '../entity';

/**
 * Interface desciribing a Font configuration object
 */
export interface FontConfig extends Omit<Required<EntityManagerConfig>, 'name'> {
    /** Charset renderable by sampling from the texture */
    readonly charset: Array<string>;
}
