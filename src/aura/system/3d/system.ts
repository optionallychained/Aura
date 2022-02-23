import { Game } from '../../core/3d/game';
import { SystemBase } from '../system.base';

/**
 * Abstract 3D System; a frame update utility representing a distinct functional purpose within a 3D Game
 *
 * Systems for 3D Games should extend from this class, which will provide a type-correct 3D Game in its tick method
 */
export abstract class System extends SystemBase<Game> { }
