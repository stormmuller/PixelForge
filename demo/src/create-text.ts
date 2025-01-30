import { common, ecs, math, rendering } from '../../src';

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

  const textSprite = new rendering.Sprite(textRenderSource, math.Vector2.zero);

  const positionComponent = new common.PositionComponent(
    window.innerWidth / 2,
    window.innerHeight / 2,
  );

  const textEntity = new ecs.Entity('bolt', [
    positionComponent,
    new common.ScaleComponent(),
    new common.RotationComponent(0),
    new rendering.SpriteComponent(textSprite, renderLayer),
  ]);

  world.addEntity(textEntity);

  return textEntity;
};
