import { ecs, rendering } from '../../src';

export const createRenderLayer = (
  layerService: rendering.LayerService,
  cameraEntity: ecs.Entity,
  world: ecs.World,
) => {
  const foregroundRenderLayer = layerService.createLayer('foreground');

  const foregroundRenderSystem = new rendering.RenderSystem({
    layer: foregroundRenderLayer,
    cameraEntity,
  });

  world.addSystem(foregroundRenderSystem);

  return foregroundRenderLayer;
};
