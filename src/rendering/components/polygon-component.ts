import { Path } from '../../common';
import { Component } from '../../ecs';
import { Vector2 } from '../../math';

export class PolygonComponent implements Component {
  public name: symbol;
  public path: Path;
  public renderLayerName: string;
  public pivot: Vector2;
  public color: string;

  public static symbol = Symbol('Polygon');

  constructor(
    path: Path,
    pivot: Vector2,
    renderLayerName: string,
    color: string = 'black',
  ) {
    this.name = PolygonComponent.symbol;
    this.path = path;
    this.pivot = pivot;
    this.renderLayerName = renderLayerName;
    this.color = color;
  }
}
