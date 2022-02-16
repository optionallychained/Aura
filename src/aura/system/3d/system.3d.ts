import { Game3D } from '../../core/3d';
import { System } from '../system';

/**
 * Abstract class representing a 3D System, running within a Game3D
 *
 * All 3D Systems should extend from System3D
 *
 * The purpose of this middleman class is to serve as the actual extension target for 3D application Systems, allowing for the assurance
 *   that 3D Games are only configured with 3D States, and providing the type-correct Game3D instance type in System3D tick methods
 */
export abstract class System3D extends System<Game3D> { }
