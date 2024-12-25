import { Component } from '../../ecs';
import { degreesToRadians } from '../../math';

export class RotationComponent implements Component {
  public name: symbol;
  public radians: number;

  public static symbol = Symbol('Rotation');

  constructor(degrees: number) {
    this.name = RotationComponent.symbol;
    this.radians = degreesToRadians(degrees);
  }
}
