import { Path } from '../../common';
import { Component } from '../../ecs';
import { Vector2 } from '../../math';

export class PolygonComponent implements Component {
  public name: symbol;
  public path: Path;
  public renderLayerName: string;
  public anchor: Vector2;
  public color: string;

  public static symbol = Symbol('Polygon');

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
