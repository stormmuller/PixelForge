import { Vector2 } from './types';

export const scaleRelativeToPoint = (
  point: Vector2,
  pivot: Vector2,
  scale: Vector2,
) => {
  const xScaled = scale.x * (point.x - pivot.x) + pivot.x;
  const yScaled = scale.y * (point.y - pivot.y) + pivot.y;

  return new Vector2(xScaled, yScaled);
};
