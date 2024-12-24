import { BoundingBox } from '../../math';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export type RenderSourceMap = {
  [key: string]: RenderSource;
};

export class CompositeRenderSource implements RenderSource {
  renderSourcesMap: RenderSourceMap;
  renderSources: RenderSource[];
  boundingBox: BoundingBox;
  renderEffects: RenderEffects;

  constructor(
    renderSourcesMap: RenderSourceMap,
    renderEffects: RenderEffects = {},
  ) {
    this.renderSourcesMap = renderSourcesMap;
    this.renderSources = Object.values(this.renderSourcesMap);
    this.boundingBox = BoundingBox.combineBoundingBoxes(
      this.renderSources.map((r) => r.boundingBox),
    );
    this.renderEffects = renderEffects;
  }

  public getRenderSource<T>(key: string): T {
    return this.renderSourcesMap[key] as T;
  }

  public render(layer: RenderLayer): void {
    for (const renderSourceName in this.renderSourcesMap) {
      const renderSource = this.renderSourcesMap[renderSourceName];
      renderSource.render(layer);
    }
  }
}
