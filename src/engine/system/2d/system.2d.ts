import { Game2D } from '../../core';
import { System } from '../system';

/**
 * Abstract class representing a 2D System, running within a Game2D
 *
 * All 2D Systems should extend from System2D
 *
 * The purpose of this middleman class is to serve as the actual extension target for 2D application Systems, allowing for the assurance
 *   that 2D Games are only configured with 2D States, and providing the type-correct Game2D instance type in System2D tick methods
 */
export abstract class System2D extends System<Game2D> { }
