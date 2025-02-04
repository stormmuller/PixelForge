import { Vector2 } from '../math';
import { CLEAR_STRATEGY, CLEAR_STRATEGY_KEYS } from './types';

export class RenderLayer {
  public name: string;
  public canvas: HTMLCanvasElement;
  public context: WebGL2RenderingContext;
  public center: Vector2;
  public clearStrategy: CLEAR_STRATEGY_KEYS;

  constructor(
    name: string,
    canvas: HTMLCanvasElement,
    clearStrategy: CLEAR_STRATEGY_KEYS = CLEAR_STRATEGY.blank,
  ) {
    const context = canvas.getContext('webgl2');

    if (!context) {
      throw new Error('Context not found');
    }

    this.name = name;
    this.canvas = canvas;
    this.context = context;
    this.center = new Vector2(canvas.width / 2, canvas.height / 2);
    this.clearStrategy = clearStrategy;
  }

  public resize = (width: number, height: number) => {
    this.canvas.width = width;
    this.canvas.height = height;

    this.center = new Vector2(this.canvas.width / 2, this.canvas.height / 2);
  };
}
