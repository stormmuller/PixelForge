import { Vector2 } from '../../math';

export const worldToScreenSpace = (
  worldPosition: Vector2,
  cameraPosition: Vector2,
  cameraZoom: number,
  canvasCenter: Vector2,
) => {
  const relativePosition = worldPosition.subtract(cameraPosition);
  const zoomedPosition = relativePosition.multiply(cameraZoom);
  const screenPosition = zoomedPosition.add(canvasCenter);

  return screenPosition;
};
