import { Path } from '../../common';
import { calculateBoxCollider, Vector2 } from '../../math';
import { BoxCollider } from '../../physics';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export class LineRenderSource implements RenderSource {
  public points: Vector2[];
  public radius: number;
  public color: string;
  public lineWidth: number;
  public boxCollider: BoxCollider;
  public renderEffects: RenderEffects;

  constructor(
    points: Vector2[],
    radius: number,
    color: string = 'black',
    lineWidth: number = 1,
    renderEffects: RenderEffects = {},
  ) {
    this.points = points;
    this.radius = radius;
    this.color = color;
    this.lineWidth = lineWidth;
    this.renderEffects = renderEffects;

    this.boxCollider = new BoxCollider(Vector2.zero, Vector2.zero);
  }

  public render = (layer: RenderLayer): void => {
    if (this.points.length < 2) return; // Nothing to draw

    this.boxCollider = calculateBoxCollider(new Path(this.points));

    layer.context.beginPath();
    layer.context.strokeStyle = this.color;
    layer.context.lineWidth = this.lineWidth;
    layer.context.lineCap = 'round';
    layer.context.lineJoin = 'round';

    for (const point of this.points) {
      layer.context.lineTo(point.x, point.y);
    }

    layer.context.stroke();
  }
}
