import { common, ecs, rendering } from '@stormmuller/pixelforge';

export const createRenderLayer = (
  layerService: rendering.LayerService,
  cameraEntity: ecs.Entity,
  worldSpace: common.Space,
  world: ecs.World
) => {
  const foregroundRenderLayer = layerService.createLayer("foreground");

  const foregroundRenderSystem = new rendering.RenderSystem(
    foregroundRenderLayer,
    cameraEntity,
    worldSpace
  );

  world.addSystem(foregroundRenderSystem);

  return foregroundRenderLayer;
}