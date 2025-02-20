import { Vector2 } from '../../math';

/**
 * The `Collider` interface defines the structure for collider objects.
 * It provides methods to check containment, combine with other colliders,
 * and calculate bounding boxes.
 */
export interface Collider<T extends Collider<T>> {
  /** The maximum x-coordinate of the collider */
  maxX: number;

  /** The minimum x-coordinate of the collider */
  minX: number;

  /** The maximum y-coordinate of the collider */
  maxY: number;

  /** The minimum y-coordinate of the collider */
  minY: number;

  /**
   * Checks if a given point is contained within the collider.
   * @param point - The point to check.
   * @returns `true` if the point is within the collider, `false` otherwise.
   */
  contains(point: Vector2): boolean;

  /**
   * Combines this collider with another collider to create a new bounding box.
   * @param other - The other collider to combine with.
   * @returns A new collider representing the combined bounding box.
   */
  combine(other: T): T;

  /**
   * Combines this collider with an array of other colliders to create a new bounding box.
   * @param others - An array of other colliders to combine with.
   * @returns A new collider representing the combined bounding box.
   */
  combineAll(others: T[]): T;
}
