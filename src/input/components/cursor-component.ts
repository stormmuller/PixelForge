import { Component } from '../../ecs';

export class CursorComponent implements Component {
  name: symbol;

  static symbol = Symbol('Cursor');

  constructor() {
    this.name = CursorComponent.symbol;
  }
}
