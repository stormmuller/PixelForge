export function lerp(v0: number, v1: number, t: number) {
  return v0 + t * (v1 - v0);
}