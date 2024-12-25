import { Component } from '../../ecs';

export class CursorComponent implements Component {
  public name: symbol;

  public static symbol = Symbol('Cursor');

  constructor() {
    this.name = CursorComponent.symbol;
  }
}
