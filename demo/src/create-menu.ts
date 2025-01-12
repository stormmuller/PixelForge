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
    itemWidth: roundedRectangleRenderSourceOptions.width,
    itemHeight: roundedRectangleRenderSourceOptions.height,
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

    buttonLayoutContainers.push({
      children: [],
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
      new math.Vector2(500, 300),
    ),
    itemWidth: roundedRectangleRenderSourceOptions.width,
    itemHeight: roundedRectangleRenderSourceOptions.height,
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
