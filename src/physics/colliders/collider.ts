import { Vector2 } from "../../math";

export interface Collider<T extends Collider<T>> {
  maxX: number;
  minX: number;
  maxY: number;
  minY: number;

  contains(point: Vector2): boolean;
  combine(other: T): T;
  combineAll(others: T[]): T;
}
