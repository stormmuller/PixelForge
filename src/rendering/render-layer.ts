import { Space } from '../common';
import { Vector2 } from '../math';
import { ClearStrategy } from './types/clear-strategy.enum';

export class RenderLayer {
  name: string;
  context: CanvasRenderingContext2D;
  center: Vector2;
  clearStrategy: ClearStrategy;

  constructor(
    name: string,
    context: CanvasRenderingContext2D,
    center: Vector2,
    clearStrategy: ClearStrategy = ClearStrategy.BLANK,
  ) {
    this.name = name;
    this.context = context;
    this.center = center;
    this.clearStrategy = clearStrategy;
  }

  resize = () => {
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;

    this.center = new Vector2(
      this.context.canvas.width / 2,
      this.context.canvas.height / 2,
    );
  };
}
