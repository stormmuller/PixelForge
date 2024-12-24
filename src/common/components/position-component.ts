import { Component } from '../../ecs';
import { Vector2 } from '../../math';

export class PositionComponent extends Vector2 implements Component {
  public name: symbol;

  static symbol = Symbol('Position');

  constructor(x: number = 0, y: number = 0) {
    super(x, y);

    this.name = PositionComponent.symbol;
  }
}
