import { Vector2 } from '../math';
import { RenderSource } from './render-sources';

export class Sprite {
  public renderSource: RenderSource;
  public pivot: Vector2;

  constructor(renderSource: RenderSource, pivot: Vector2) {
    this.renderSource = renderSource;
    this.pivot = pivot;
  }
}
