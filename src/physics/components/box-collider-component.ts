import { Component } from '../../ecs';
import { BoundingBox } from '../../math';

export class BoxColliderComponent implements Component {
  public name: symbol;
  public boundingBox: BoundingBox;

  public static symbol = Symbol('BoxCollider');

  constructor(boundingBox: BoundingBox) {
    this.name = BoxColliderComponent.symbol;

    this.boundingBox = boundingBox;
  }
}
