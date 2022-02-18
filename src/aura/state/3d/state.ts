import { Game } from '../../core/3d/game';
import { StateBase } from '../state.base';

/**
 * Concrete 3D State, ensuring the appropriate 3D Game type is provided in State lifecycle methods for Aura3D States
 *
 * State implementations in 3D Games should construct this class with a StateConfig
 */
export class State extends StateBase<Game> { }
