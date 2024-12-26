import {
  animations,
  common,
  ecs,
  game,
  rendering
} from '@stormmuller/pixelforge';

export const createAnimations = async (
  boltEntity: ecs.Entity,
  textEntity: ecs.Entity,
  game: game.Game,
  world: ecs.World,
) => {
  const boltRotationComponent =
    boltEntity.getComponentRequired<common.RotationComponent>(
      common.RotationComponent.symbol,
    );

  const boltScaleComponent =
    boltEntity.getComponentRequired<common.ScaleComponent>(
      common.ScaleComponent.symbol,
    );

  boltEntity.addComponent(
    new animations.AnimationComponent([
      {
        startValue: 0,
        endValue: 2 * Math.PI,
        elapsed: 0,
        duration: 5 * 1000,
        updateCallback: (value: number) => {
          boltRotationComponent.radians = value;
        },
        loop: 'pingpong',
        easing: animations.easeInOutQuint,
      },
      {
        startValue: 1,
        endValue: 1.5,
        elapsed: 0,
        duration: 5 * 1000,
        updateCallback: (value: number) => {
          boltScaleComponent.x = value;
          boltScaleComponent.y = value;
        },
        loop: 'pingpong',
        easing: animations.easeInOutQuint,
      },
    ]),
  );

  const textSpriteComponent = textEntity.getComponentRequired<rendering.SpriteComponent>(
    rendering.SpriteComponent.symbol,
  );  

  const textRenderSource = textSpriteComponent.renderSource as rendering.TextRenderSource;

  textEntity.addComponent(
    new animations.AnimationComponent([
      {
        startValue: 0,
        endValue: 1,
        elapsed: 0,
        duration: 2.5 * 1000,
        updateCallback: (value: number) => {
          textRenderSource.fontSize = value * 35;
          textRenderSource.color = `rgba(255, 255, 255, ${value})`;
        },
        loop: 'pingpong',
        easing: animations.easeInOutQuint,
      },
    ]),
  );

  const animationSystem = new animations.AnimationSystem(game.time);

  world.addSystem(animationSystem);

  world.addEntity(boltEntity);
};
