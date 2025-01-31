import { animations, common, ecs, math, rendering } from '../../../../src';
import { StarfieldComponent } from '../components';

export class StarfieldSystem extends ecs.System {
  private _world: ecs.World;
  private _imageCahce: rendering.ImageCache;
  private _renderLayer: rendering.RenderLayer;
  private _random: math.Random;

  constructor(
    world: ecs.World,
    imageCache: rendering.ImageCache,
    renderLayer: rendering.RenderLayer,
  ) {
    super('starfield', [StarfieldComponent.symbol]);

    this._world = world;
    this._imageCahce = imageCache;
    this._renderLayer = renderLayer;
    this._random = new math.Random('starfield');
  }

  public run = async (entity: ecs.Entity): Promise<void> => {
    const starfieldComponent = entity.getComponentRequired<StarfieldComponent>(
      StarfieldComponent.symbol,
    );

    const numberOfStarsToSpawn =
      starfieldComponent.targetNumberOfStars - starfieldComponent.numberOfStars;

    for (let index = 0; index < numberOfStarsToSpawn; index++) {
      await this._createStar(starfieldComponent);
    }
  };

  public stop = (): void => {};

  private _createStar = async (starfieldComponent: StarfieldComponent) => {
    const starRenderSource = await rendering.ImageRenderSource.fromImageCache(
      this._imageCahce,
      'star_small.png',
      1,
    );

    const sprite = new rendering.Sprite(
      starRenderSource,
      new math.Vector2(starRenderSource.width / 2, starRenderSource.height / 2),
    );

    const scaleComponent = new common.ScaleComponent(0.5, 0.5);

    this._world.addEntity(
      new ecs.Entity('star', [
        new common.PositionComponent(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
        ),
        scaleComponent,
        new common.RotationComponent(0),
        new rendering.SpriteComponent(sprite, this._renderLayer),
        new animations.AnimationComponent([
          {
            startValue: 0,
            endValue: this._random.randomFloat(0.1, 0.5),
            elapsed: 0,
            duration: this._random.randomFloat(1000, 5000),
            updateCallback: (value: number) => {
              scaleComponent.x = value;
              scaleComponent.y = value;
            },
            easing: (t: number) => t,
            loop: 'pingpong',
          },
        ]),
      ]),
    );

    starfieldComponent.numberOfStars++;
  };
}
