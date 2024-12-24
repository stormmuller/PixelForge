import { Component } from '../../ecs';
import { Vector2 } from '../../math';
import { RenderSource } from '../render-sources/render-source';

type DebugMode = 'off' | 'on' | 'colorOnly';

const getDefaultOptions = (renderSource: RenderSource) => ({
  anchor: new Vector2(
    renderSource.boundingBox.dimentions.x / 2,
    renderSource.boundingBox.dimentions.y / 2,
  ),
  enabled: true,
  debugMode: 'off' as DebugMode,
});

export class SpriteComponent implements Component {
  name: symbol;
  renderSource: RenderSource;
  anchor: Vector2;
  debugMode: DebugMode;
  renderLayerName: string;
  enabled: boolean;

  static symbol = Symbol('Sprite');

  constructor(
    renderSource: RenderSource,
    renderLayerName: string,
    options: {
      anchor?: Vector2,
      enabled?: boolean,
      debugMode?: DebugMode,
    } = {}
  ) {
    const defaultOptions = getDefaultOptions(renderSource);

    const mergedOptions = {
      ...defaultOptions,
      ...options
    };

    this.name = SpriteComponent.symbol;
    this.renderSource = renderSource;
    this.anchor = mergedOptions.anchor;
    this.debugMode = mergedOptions.debugMode;
    this.renderLayerName = renderLayerName;
    this.enabled = mergedOptions.enabled;
  }
}
