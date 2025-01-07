import { common, ecs, math, rendering } from '@stormmuller/pixelforge';
import { colors } from './colors';

export const createBolt = async (
  imageCache: rendering.ImageCache,
  renderLayer: rendering.RenderLayer,
  world: ecs.World,
) => {
  const boltRenderEffects = {
    glow: {
      color: colors.yellow,
      radius: 50,
    },
  };

  const boltRenderSource = await rendering.ImageRenderSource.fromImageCache(
    imageCache,
    'bolt.png',
    1,
    boltRenderEffects,
  );

  const boltSprite = new rendering.Sprite(
    boltRenderSource,
    new math.Vector2(boltRenderSource.width / 2, boltRenderSource.height / 2),
  );

  const positionComponent = new common.PositionComponent(
    window.innerWidth / 2,
    window.innerHeight / 2,
  );

  const boltEntity = new ecs.Entity('bolt', [
    positionComponent,
    new common.ScaleComponent(),
    new common.RotationComponent(0),
    new rendering.SpriteComponent(boltSprite, renderLayer),
  ]);

  world.addEntity(boltEntity);

  return boltEntity;
};
