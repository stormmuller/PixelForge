export const createProjectionMatrix = (width: number, height: number) => {
  // This matrix maps 0..width to 0..2, so that 0..width -> -1..1 in X
  // and 0..height -> -1..1 in Y
  return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1]; // 3x3 matrix
};
