import { BoxCollider } from '../../physics';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export type RenderSourceMap = {
  [key: string]: RenderSource;
};

export class CompositeRenderSource implements RenderSource {
  public renderSourcesMap: RenderSourceMap;
  public renderSources: RenderSource[];
  public boxCollider: BoxCollider;
  public renderEffects: RenderEffects;

  constructor(
    renderSourcesMap: RenderSourceMap,
    renderEffects: RenderEffects = {},
  ) {
    this.renderSourcesMap = renderSourcesMap;
    this.renderSources = Object.values(this.renderSourcesMap);
    this.boxCollider = BoxCollider.fromOtherBoxes(
      this.renderSources.map((r) => r.boxCollider),
    );
    this.renderEffects = renderEffects;
  }

  public getRenderSource = <T>(key: string): T => {
    return this.renderSourcesMap[key] as T;
  };

  public render = (layer: RenderLayer): void => {
    for (const renderSourceName in this.renderSourcesMap) {
      const renderSource = this.renderSourcesMap[renderSourceName];
      renderSource.render(layer);
    }
  };
}
