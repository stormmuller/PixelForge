import { Path } from '../../common';
import { Component } from '../../ecs';
import { Vector2 } from '../../math';

export class PolygonComponent implements Component {
  name: symbol;
  path: Path;
  renderLayerName: string;
  anchor: Vector2;
  color: string;

  static symbol = Symbol('Polygon');

  constructor(
    path: Path,
    anchor: Vector2,
    renderLayerName: string,
    color: string = 'black',
  ) {
    this.name = PolygonComponent.symbol;
    this.path = path;
    this.anchor = anchor;
    this.renderLayerName = renderLayerName;
    this.color = color;
  }
}
