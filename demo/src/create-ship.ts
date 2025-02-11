import { assetLoading, common, ecs, rendering } from '../../src';
import { ShipComponent } from './ship';

export const createShip = async (
  imageCache: assetLoading.ImageCache,
  renderLayer: rendering.RenderLayer,
  world: ecs.World,
) => {
  const image = await imageCache.getOrLoad('ship_L.png');
  const shipSprite = new rendering.Sprite({
    image,
    renderLayer,
  });

  const positionComponent = new common.PositionComponent(
    window.innerWidth / 2,
    window.innerHeight - 100,
  );

  const scaleComponent = new common.ScaleComponent();

  const shipEntity = new ecs.Entity('ship', [
    positionComponent,
    scaleComponent,
    new common.RotationComponent(0),
    new rendering.SpriteComponent(shipSprite),
    new ShipComponent({
      rotationSpeed: 0.5,
      speed: 0.5,
    }),
  ]);

  world.addEntity(shipEntity);

  return shipEntity;
};
