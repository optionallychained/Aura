import { Game } from '../../core/2d/game';
import { StateBase } from '../state.base';

/**
 * Concrete 2D State, ensuring the appropriate 2D Game type is provided in State lifecycle methods for Aura2D States
 *
 * State implementations in 2D Games should construct this class with a StateConfig
 */
export class State extends StateBase<Game> { }
