import { Component } from '../../ecs';
import { degreesToRadians } from '../../math';

export class RotationComponent implements Component {
  name: symbol;
  radians: number;

  static symbol = Symbol('Rotation');

  constructor(degrees: number) {
    this.name = RotationComponent.symbol;
    this.radians = degreesToRadians(degrees);
  }
}
