import { Vector2 } from '../math';
import { ClearStrategy } from './types/clear-strategy.enum';

export class RenderLayer {
  public name: string;
  public context: CanvasRenderingContext2D;
  public center: Vector2;
  public clearStrategy: ClearStrategy;

  constructor(
    name: string,
    context: CanvasRenderingContext2D,
    center: Vector2,
    clearStrategy: ClearStrategy = ClearStrategy.blank,
  ) {
    this.name = name;
    this.context = context;
    this.center = center;
    this.clearStrategy = clearStrategy;
  }

  public resize() {
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;

    this.center = new Vector2(
      this.context.canvas.width / 2,
      this.context.canvas.height / 2,
    );
  }
}
