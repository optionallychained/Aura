import { Game3D } from '../../core/3d/game.3d';
import { State } from '../state';

/**
 * Concrete State3D object, serving as an instantiable State for 3D Games and type-narrowing its lifecycle method parameters so as to
 *   receive and work with a type-correct Game3D
 */
export class State3D extends State<Game3D> { }
