import { common, ecs, rendering } from '@stormmuller/pixelforge';

export const createBolt = async (
  imageCache: rendering.ImageCache,
  renderLayer: rendering.RenderLayer,
  world: ecs.World
) => {
  const boltRenderSource = await rendering.ImageRenderSource.fromImageCache(
    imageCache,
    'bolt.png',
    1,
    {
      glow: {
        color: 'rgba(255, 255, 0, 0.3)',
        radius: 50,
      },
    },
  );

  const positionComponent = new common.PositionComponent(
    window.innerWidth / 2,
    window.innerHeight / 2,
  );

  const boltEntity = new ecs.Entity('bolt', [
    positionComponent,
    new common.ScaleComponent(),
    new common.RotationComponent(0),
    new rendering.SpriteComponent(boltRenderSource, renderLayer.name),
  ]);

  world.addEntity(boltEntity);

  return boltEntity;
};
