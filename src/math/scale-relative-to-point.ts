import { Vector2 } from './types';

export const scaleRelativeToPoint = (
  point: Vector2,
  anchor: Vector2,
  scale: Vector2,
) => {
  const xScaled = scale.x * (point.x - anchor.x) + anchor.x;
  const yScaled = scale.y * (point.y - anchor.y) + anchor.y;

  return new Vector2(xScaled, yScaled);
};
