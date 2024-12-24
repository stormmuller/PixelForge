import { Vector2 } from "./types";

export const vectorToRadians = (vector: Vector2) => {
  return Math.atan2(vector.y, vector.x);
};
