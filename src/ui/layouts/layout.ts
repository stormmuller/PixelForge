import { Vector2 } from '../../math';

export interface LayoutContainer {
  position: Vector2;
  scale: Vector2;
  children: LayoutContainer[];
  layout: Layout;
}

export type LayoutResult = {
  position: Vector2;
};

export interface Layout {
  update: (children: LayoutContainer[]) => void;
}
