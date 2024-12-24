import { Vector2 } from '../../math';

export function screenToWorldSpace(
  screenPosition: Vector2,
  cameraPosition: Vector2,
  cameraZoom: number,
  canvasCenter: Vector2
): Vector2 {
  return screenPosition
    .subtract(canvasCenter)
    .divide(cameraZoom)
    .add(cameraPosition);
}