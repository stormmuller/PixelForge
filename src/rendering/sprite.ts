import { Vector2 } from '../math';
import { RenderSource } from './render-sources';

export class Sprite {
  public renderSource: RenderSource;
  public anchor: Vector2;

  constructor(renderSource: RenderSource, anchor: Vector2) {
    this.renderSource = renderSource;
    this.anchor = anchor;
  }
}
