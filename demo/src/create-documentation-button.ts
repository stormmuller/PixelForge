import { ecs, math, rendering, ui } from '@stormmuller/pixelforge';
import { colors } from './colors';

export const createDocumentationButton = async (
  renderLayer: rendering.RenderLayer,
  world: ecs.World,
) => {
  const position = new math.Vector2(
    window.innerWidth / 2,
    window.innerHeight / 2 - 300,
  );

  const { buttonEntity, textEntity, buttonRenderSoruce } = ui.createButton({
    position,
    renderLayer,
    roundedRectangleRenderSourceOptions: {
      height: 100,
      width: 250,
      color: colors.yellow,
      lineWidth: 5,
      lineColor: colors.yellow,
      radius: 20,
    },
    textRenderSourceOptions: {
      text: 'Documentation',
      maxWidth: 500,
      overflowWidth: 500,
      fontFamily: 'Verdana',
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      textBaseline: 'middle',
    },
    world,
  });

  buttonEntity.addComponent(
    new ui.HoverableComponent({
      onHoverStart: () => {
        buttonRenderSoruce.color = colors.blue;
      },
      onHoverEnd: () => {
        buttonRenderSoruce.color = colors.yellow;
      },
    }),
  );

  return { buttonEntity, textEntity };
};
