export type CLEAR_STRATEGY_KEYS =
  (typeof CLEAR_STRATEGY)[keyof typeof CLEAR_STRATEGY];

export const CLEAR_STRATEGY = {
  none: 'none',
  blank: 'blank',
} as const;
