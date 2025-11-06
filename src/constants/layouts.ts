/**
 * Layout type constants for mind map layouts
 */
export const LAYOUT_TYPES = {
  /** Left to Right layout */
  LR: 'LR',
  /** Top to Bottom layout */
  TB: 'TB',
  /** No layout change - uses current layout direction */
  NONE: 'None',
} as const;

export type LayoutType = typeof LAYOUT_TYPES[keyof typeof LAYOUT_TYPES];
