import { Path } from '../common';
import { BoxCollider } from '../physics';
import { Vector2 } from './vector2';

/**
 * Calculates a bounding box (BoxCollider) that encompasses all the points in the given path.
 *
 * @param points - An array of Vector2 points representing the path.
 * @returns A BoxCollider that represents the bounding box of the given points.
 * @throws An error if the path contains fewer than 2 points.
 */
export const calculateBoxCollider = (points: Path): BoxCollider => {
  if (points.length < 2) {
    throw new Error(
      'There needs to be at least 2 points in order to calculate a bounding box',
    );
  }

  let minX = points.first.x;
  let maxX = points.first.x;

  let minY = points.first.y;
  let maxY = points.first.y;

  for (let i = 1; i < points.length; i++) {
    const point = points.at(i);

    if (point.x > maxX) {
      maxX = point.x;
    }

    if (point.x < minX) {
      minX = point.x;
    }

    if (point.y > maxY) {
      maxY = point.y;
    }

    if (point.y < minY) {
      minY = point.y;
    }
  }

  const point = new Vector2(minX, minY);
  const dimensions = new Vector2(maxX - minX, maxY - minY);

  return new BoxCollider(point, dimensions);
};
