import { Component } from '../../ecs';
import { RenderLayer } from '../render-layer';
import { Sprite } from '../sprite';

export class SpriteComponent implements Component {
  public name: symbol;
  public sprite: Sprite;
  public renderLayer: RenderLayer;
  public enabled: boolean;

  public static symbol = Symbol('Sprite');

  constructor(
    sprite: Sprite,
    renderLayer: RenderLayer,
    enabled: boolean = true,
  ) {

    this.name = SpriteComponent.symbol;

    this.sprite = sprite;
    this.renderLayer = renderLayer;
    this.enabled = enabled;
  }
}
