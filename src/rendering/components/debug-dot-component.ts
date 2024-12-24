import { Component } from '../../ecs';

export class DebugDotComponent implements Component {
  public name: symbol;
  public color: string;
  public radius: number;

  static symbol = Symbol('Position');

  constructor(color: string = 'yellow', radius: number = 3) {
    this.name = DebugDotComponent.symbol;
    this.color = color;
    this.radius = radius;
  }
}
