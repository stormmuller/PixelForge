import { Path } from '../../common';
import { calculateBoxCollider } from '../../math';
import { BoxCollider } from '../../physics';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export class PolygonRenderSource implements RenderSource {
  public path: Path;
  public color: string;
  public boxCollider: BoxCollider;
  public renderEffects: RenderEffects;

  constructor(
    path: Path,
    color: string = 'black',
    renderEffects: RenderEffects = {},
  ) {
    this.path = path;
    this.color = color;
    this.boxCollider = calculateBoxCollider(path);
    this.renderEffects = renderEffects;
  }

  public render = (layer: RenderLayer): void =>  {
    layer.context.beginPath();

    for (let i = 0; i < this.path.length; i++) {
      const point = this.path.at(i);

      if (i === 0) {
        layer.context.moveTo(point.x, point.y);
      } else {
        layer.context.lineTo(point.x, point.y);
      }
    }

    layer.context.fillStyle = this.color;
    layer.context.fill();
  }
}
