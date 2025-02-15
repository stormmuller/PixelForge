import {
  animations,
  assetLoading,
  common,
  ecs,
  math,
  rendering,
} from '../../../../src';
import { StarfieldComponent } from '../components';

export class StarfieldSystem extends ecs.System {
  private _world: ecs.World;
  private _imageCache: assetLoading.ImageCache;
  private _renderLayer: rendering.RenderLayer;
  private _random: math.Random;

  constructor(
    world: ecs.World,
    imageCache: assetLoading.ImageCache,
    renderLayer: rendering.RenderLayer,
  ) {
    super('starfield', [StarfieldComponent.symbol]);

    this._world = world;
    this._imageCache = imageCache;
    this._renderLayer = renderLayer;
    this._random = new math.Random('starfield');
  }

  public async run(entity: ecs.Entity): Promise<void> {
    const starfieldComponent = entity.getComponentRequired<StarfieldComponent>(
      StarfieldComponent.symbol,
    );

    const numberOfStarsToSpawn =
      starfieldComponent.targetNumberOfStars - starfieldComponent.numberOfStars;

    for (let index = 0; index < numberOfStarsToSpawn; index++) {
      await this._createStar(starfieldComponent);
    }
  }

  private async _createStar(starfieldComponent: StarfieldComponent) {
    const image = await this._imageCache.getOrLoad('star_small.png');

    const sprite = new rendering.Sprite({
      image,
      renderLayer: this._renderLayer,
    });

    const scaleComponent = new common.ScaleComponent(0.5, 0.5);

    this._world.addEntity(
      new ecs.Entity('star', [
        new common.PositionComponent(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
        ),
        scaleComponent,
        new common.RotationComponent(0),
        new rendering.SpriteComponent(sprite),
        new animations.AnimationComponent({
          duration: this._random.randomFloat(1000, 5000),
          updateCallback: (value: number) => {
            scaleComponent.x = value * 0.5;
            scaleComponent.y = value * 0.5;
          },
          loop: 'pingpong',
        }),
      ]),
    );

    starfieldComponent.numberOfStars++;
  }
}
