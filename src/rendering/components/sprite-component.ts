import { Component } from '../../ecs';
import { Sprite } from '../sprite';

export class SpriteComponent implements Component {
  public name: symbol;
  public sprite: Sprite;
  public enabled: boolean;

  public static symbol = Symbol('Sprite');

  constructor(sprite: Sprite, enabled: boolean = true) {
    this.name = SpriteComponent.symbol;

    this.sprite = sprite;
    this.enabled = enabled;
  }
}
