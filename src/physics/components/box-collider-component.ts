import { Component } from '../../ecs';
import { BoundingBox } from '../../math';

export class BoxColliderComponent implements Component {
  name: symbol;
  boundingBox: BoundingBox;

  static symbol = Symbol('BoxCollider');

  constructor(boundingBox: BoundingBox) {
    this.name = BoxColliderComponent.symbol;

    this.boundingBox = boundingBox;
  }
}
