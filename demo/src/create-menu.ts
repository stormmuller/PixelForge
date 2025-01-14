import {
  common,
  ecs,
  math,
  physics,
  rendering,
  ui,
} from '@stormmuller/pixelforge';
import { colors } from './colors';

const roundedRectangleRenderSourceOptions = {
  height: 50,
  width: 100,
  color: colors.yellow,
  radius: 5,
};

export const createMenu = (
  world: ecs.World,
  renderLayer: rendering.RenderLayer,
) => {
  const children = createButtons(world, renderLayer);
  createRootLayout(world, children);

  world.addSystem(new ui.LayoutSystem());
};

const createButtons = (
  world: ecs.World,
  renderLayer: rendering.RenderLayer,
) => {
  const buttons = [
    'Button 1',
    'Button 2',
    'Button 3',
    'Button 4',
    'Button 5',
    'Button 6',
    'Button 7',
    'Button 8',
    'Button 9',
    'Button 10',
  ];

  const buttonLayoutContainers: ui.LayoutContainer[] = [];

  const layout = new ui.GridLayout({
    boxCollider: new physics.BoxCollider(
      new math.Vector2(0, 0),
      new math.Vector2(
        roundedRectangleRenderSourceOptions.width,
        roundedRectangleRenderSourceOptions.height,
      ),
    ),
    columns: 5,
    rows: 5,
    itemGap: 0,
    layoutPadding: 0,
  });

  for (const buttonText of buttons) {
    const renderSource = new rendering.RoundedRectangleRenderSource(
      roundedRectangleRenderSourceOptions,
    );

    const sprite = new rendering.Sprite(renderSource, math.Vector2.zero);

    const position = new common.PositionComponent();
    const scale = new common.ScaleComponent();

    const buttonEntity = new ecs.Entity(buttonText, [
      position,
      new common.RotationComponent(0),
      scale,
      new rendering.SpriteComponent(sprite, renderLayer),
    ]);

    world.addEntity(buttonEntity);

    const { textPosition, textScale } = createButtonText(
      buttonText,
      renderLayer,
      world,
    );

    buttonLayoutContainers.push({
      children: [
        {
          children: [],
          layout,
          position: textPosition,
          scale: textScale,
        },
      ],
      layout,
      position,
      scale,
    });
  }

  return buttonLayoutContainers;
};

const createRootLayout = (world: ecs.World, children: ui.LayoutContainer[]) => {
  const layout = new ui.GridLayout({
    boxCollider: new physics.BoxCollider(
      new math.Vector2(0, 0),
      new math.Vector2(800, 500),
    ),
    columns: 5,
    rows: 5,
    itemGap: 20,
    layoutPadding: 20,
  });

  const positionComponent = new common.PositionComponent();
  const scaleComponent = new common.ScaleComponent();

  const rootLayout = new ecs.Entity('RootLayout', [
    positionComponent,
    scaleComponent,
    new ui.LayoutRootComponent(
      children,
      layout,
      positionComponent,
      scaleComponent,
    ),
  ]);

  world.addEntity(rootLayout);
};

const createButtonText = (
  text: string,
  renderLayer: rendering.RenderLayer,
  world: ecs.World,
) => {
  const textRenderSource = new rendering.TextRenderSource({
    text,
    maxWidth: roundedRectangleRenderSourceOptions.width,
    color: 'white',
  });

  const sprite = new rendering.Sprite(textRenderSource, math.Vector2.zero);
  const textPosition = new common.PositionComponent();
  const textScale = new common.ScaleComponent();

  const textEntity = new ecs.Entity(`ButtonText ${text}`, [
    textPosition,
    new common.RotationComponent(0),
    textScale,
    new rendering.SpriteComponent(sprite, renderLayer),
  ]);

  world.addEntity(textEntity);

  return { textEntity, textPosition, textScale };
};
