import {
  PositionComponent,
  RotationComponent,
  ScaleComponent,
} from '../../common';
import { Entity, World } from '../../ecs';
import { Vector2 } from '../../math';
import { BoxCollider, BoxColliderComponent } from '../../physics';
import {
  defaultRoundedRectangleRenderSourceOptions,
  defaultTextRenderSourceOptions,
  RenderLayer,
  RoundedRectangleRenderSource,
  RoundedRectangleRenderSourceOptions,
  Sprite,
  SpriteComponent,
  TextRenderSource,
  TextRenderSourceOptions,
} from '../../rendering';

export type CreateButtonOptions = {
  renderLayer: RenderLayer;
  position: Vector2;
  world: World;
  textRenderSourceOptions: TextRenderSourceOptions;
  roundedRectangleRenderSourceOptions: RoundedRectangleRenderSourceOptions;
};

const defaultOptions = {
  textRenderSourceOptions: defaultTextRenderSourceOptions,
  roundedRectangleRenderSourceOptions:
    defaultRoundedRectangleRenderSourceOptions,
};

export function createButton(options: CreateButtonOptions) {
  const {
    renderLayer,
    position,
    world,
    roundedRectangleRenderSourceOptions,
    textRenderSourceOptions
  } = {
    ...defaultOptions,
    ...options,
  };

  const buttonRenderSoruce = new RoundedRectangleRenderSource(
    roundedRectangleRenderSourceOptions,
  );

  const buttonSprite = new Sprite(
    buttonRenderSoruce,
    new Vector2(
      roundedRectangleRenderSourceOptions.width / 2,
      roundedRectangleRenderSourceOptions.height / 2,
    ),
  );

  const collider = new BoxCollider(
    position.subtract(buttonSprite.pivot),
    new Vector2(
      roundedRectangleRenderSourceOptions.width,
      roundedRectangleRenderSourceOptions.height,
    ),
  );

  const buttonEntity = new Entity('button', [
    new PositionComponent(position.x, position.y),
    new ScaleComponent(),
    new RotationComponent(0),
    new SpriteComponent(buttonSprite, renderLayer),
    new BoxColliderComponent(collider),
  ]);

  const textRenderSource = new TextRenderSource(textRenderSourceOptions);

  const textSprite = new Sprite(textRenderSource, Vector2.zero);

  const textEntity = new Entity('button text', [
    new PositionComponent(position.x, position.y),
    new ScaleComponent(),
    new RotationComponent(0),
    new SpriteComponent(textSprite, renderLayer),
  ]);

  world.addEntities([buttonEntity, textEntity]);

  return {
    buttonEntity,
    textEntity,
    buttonSprite,
    textSprite,
    buttonRenderSoruce,
    textRenderSource,
  };
}
