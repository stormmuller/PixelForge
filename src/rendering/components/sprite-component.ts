import { Component } from '../../ecs';
import { Vector2 } from '../../math';
import { RenderSource } from '../render-sources/render-source';

type DebugMode = 'off' | 'on' | 'colorOnly';

const getDefaultOptions = (renderSource: RenderSource) => ({
  anchor: new Vector2(
    renderSource.boxCollider.dimentions.x / 2,
    renderSource.boxCollider.dimentions.y / 2,
  ),
  enabled: true,
  debugMode: 'off' as DebugMode,
});

export class SpriteComponent implements Component {
  public name: symbol;
  public renderSource: RenderSource;
  public anchor: Vector2;
  public debugMode: DebugMode;
  public renderLayerName: string;
  public enabled: boolean;

  public static symbol = Symbol('Sprite');

  constructor(
    renderSource: RenderSource,
    renderLayerName: string,
    options: {
      anchor?: Vector2;
      enabled?: boolean;
      debugMode?: DebugMode;
    } = {},
  ) {
    const defaultOptions = getDefaultOptions(renderSource);

    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };

    this.name = SpriteComponent.symbol;
    this.renderSource = renderSource;
    this.anchor = mergedOptions.anchor;
    this.debugMode = mergedOptions.debugMode;
    this.renderLayerName = renderLayerName;
    this.enabled = mergedOptions.enabled;
  }
}
