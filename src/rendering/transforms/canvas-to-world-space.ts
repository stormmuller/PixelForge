import { Vector2 } from '../../math';

export const canvasToWorldSpace = (
  canvasPosition: Vector2,
  worldCenter: Vector2,
) => canvasPosition.add(worldCenter);
