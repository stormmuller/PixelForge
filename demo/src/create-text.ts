import { common, ecs, math, rendering } from '@stormmuller/pixelforge';

export const createText = async (
  renderLayer: rendering.RenderLayer,
  world: ecs.World,
) => {
  const textRenderSource = new rendering.TextRenderSource({
    text: 'Pixel Forge',
    maxWidth: 500,
    overflowWidth: 500,
    fontFamily: 'Verdana',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    textBaseline: 'middle',
  });

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
