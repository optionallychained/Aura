import { Game2D } from '../../core/2d';
import { State } from '../state';

/**
 * Concrete State2D object, serving as an instantiable State for 2D Games and type-narrowing its lifecycle method parameters so as to
 *   receive and work with a type-correct Game2D
 */
export class State2D extends State<Game2D> { }
