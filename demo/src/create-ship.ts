import { common, ecs, math, rendering } from '../../src';
import { ShipComponent } from './ship';

export const createShip = async (
  imageCache: rendering.ImageCache,
  renderLayer: rendering.RenderLayer,
  world: ecs.World,
) => {
  const shipRenderSource = await rendering.ImageRenderSource.fromImageCache(
    imageCache,
    'ship_L.png',
    1,
  );

  const shipSprite = new rendering.Sprite(
    shipRenderSource,
    new math.Vector2(shipRenderSource.width / 2, shipRenderSource.height / 2),
  );

  const positionComponent = new common.PositionComponent(
    window.innerWidth / 2,
    window.innerHeight - 100,
  );

  const shipEntity = new ecs.Entity('ship', [
    positionComponent,
    new common.ScaleComponent(),
    new common.RotationComponent(0),
    new rendering.SpriteComponent(shipSprite, renderLayer),
    new ShipComponent({
      rotationSpeed: 0.5,
      speed: 0.5,
    }),
  ]);

  world.addEntity(shipEntity);

  return shipEntity;
};
