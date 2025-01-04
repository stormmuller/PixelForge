import { BoxCollider } from '../../physics';
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
  boxCollider: BoxCollider;
  renderEffects: RenderEffects;
}
