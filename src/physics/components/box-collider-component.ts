import { Component } from '../../ecs';
import { BoxCollider } from '../colliders';

export class BoxColliderComponent implements Component {
  public name: symbol;
  public boxCollider: BoxCollider;

  public static symbol = Symbol('BoxCollider');

  constructor(boxCollider: BoxCollider) {
    this.name = BoxColliderComponent.symbol;

    this.boxCollider = boxCollider;
  }
}
