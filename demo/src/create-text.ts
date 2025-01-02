import { common, ecs, math, rendering } from '@stormmuller/pixelforge';

export const createText = async (
  renderLayer: rendering.RenderLayer,
  world: ecs.World,
) => {
  const textRenderSource = new rendering.TextRenderSource(
    'Pixel Forge',
    500,
    500,
    'Verdana',
    30,
    'white',
    'center',
    'middle',
  );

  const positionComponent = new common.PositionComponent(
    window.innerWidth / 2,
    window.innerHeight / 2,
  );

  const textEntity = new ecs.Entity('bolt', [
    positionComponent,
    new common.ScaleComponent(),
    new common.RotationComponent(0),
    new rendering.SpriteComponent(textRenderSource, renderLayer.name, {
      anchor: math.Vector2.zero,
    }),
  ]);

  world.addEntity(textEntity);

  return textEntity;
};
