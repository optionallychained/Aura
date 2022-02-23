import { Game } from '../../core/2d/game';
import { SystemBase } from '../system.base';

/**
 * Abstract 2D System; a frame update utility representing a distinct functional purpose within a 2D Game
 *
 * Systems for 2D Games should extend from this class, which will provide a type-correct 2D Game in its tick method
 */
export abstract class System extends SystemBase<Game> { }
