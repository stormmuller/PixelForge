import { Vector2 } from '../../math';
// import { BoxCollider } from '../../physics';

export interface LayoutContainer {
  position: Vector2;
  scale: Vector2;
  children: LayoutContainer[];
  layout: Layout;
  // boundingBox: BoxCollider;
}

export type LayoutResult = {
  position: Vector2;
};

export interface Layout {
  update: (children: LayoutContainer[], offset: Vector2) => void;
}
