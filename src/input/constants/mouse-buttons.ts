export type MouseButton = (typeof mouseButtons)[keyof typeof mouseButtons];

export const mouseButtons = {
  left: 0,
  middle: 1,
  right: 2,
};
