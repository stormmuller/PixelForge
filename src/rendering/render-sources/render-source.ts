import { RenderLayer } from '../render-layer';

export type GlowEffect = {
  color: string;
  radius: number;
};

export type RenderEffects = {
  glow?: GlowEffect;
  opacity?: number;
};

export interface RenderSource {
  render(layer: RenderLayer): void;
  renderEffects: RenderEffects;
  resize(width: number, height: number): void;
}
