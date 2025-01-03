import { Vector2 } from '../math';
import { CLEAR_STRATEGY, CLEAR_STRATEGY_KEYS } from './types';

export class RenderLayer {
  public name: string;
  public context: CanvasRenderingContext2D;
  public center: Vector2;
  public clearStrategy: CLEAR_STRATEGY_KEYS;

  constructor(
    name: string,
    context: CanvasRenderingContext2D,
    center: Vector2,
    clearStrategy: CLEAR_STRATEGY_KEYS = CLEAR_STRATEGY.blank,
  ) {
    this.name = name;
    this.context = context;
    this.center = center;
    this.clearStrategy = clearStrategy;
  }

  public resize = () => {
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;

    this.center = new Vector2(
      this.context.canvas.width / 2,
      this.context.canvas.height / 2,
    );
  }
}
