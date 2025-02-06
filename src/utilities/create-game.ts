import { PositionComponent, Space } from '../common';
import { Entity, World } from '../ecs';
import { Game, Scene } from '../game';
import { InputsComponent, InputSystem } from '../input';
import { Vector2 } from '../math';
import {
  CameraComponent,
  CameraSystem,
  DEFAULT_LAYER_NAMES,
  ImageCache,
  LayerService,
  RenderSystem,
} from '../rendering';
import { createContainer } from './create-container';
import { isString } from './is-string';

export type CreateGameOptions = {
  sceneName: string;
  container: string | HTMLElement;
  layers: string[];
  dimentions: Vector2;
};

const defaultOptions: CreateGameOptions = {
  sceneName: 'main',
  container: 'pf-game',
  layers: DEFAULT_LAYER_NAMES,
  dimentions: new Vector2(window.innerWidth, window.innerHeight),
};

export async function createGame(
  options: Partial<CreateGameOptions> = defaultOptions,
) {
  const mergedOptions = { ...defaultOptions, ...options };

  const game = new Game();

  const gameContainer = isString(mergedOptions.container)
    ? createContainer(mergedOptions.container)
    : mergedOptions.container;

  const scene = new Scene(mergedOptions.sceneName);
  const imageCache = new ImageCache();

  const worldSpace = new Space(mergedOptions.dimentions);
  const layerService = new LayerService(gameContainer);

  const world = new World(game);

  const inputsEntity = new Entity('inputs', [new InputsComponent()]);

  const inputSystem = new InputSystem(gameContainer);

  world.addEntity(inputsEntity);
  world.addSystem(inputSystem);

  const cameraEntity = new Entity('world camera', [
    new CameraComponent({ allowZooming: false, allowPanning: false }),
    new PositionComponent(worldSpace.center.x, worldSpace.center.y),
  ]);

  for (const layerName of mergedOptions.layers) {
    const layer = layerService.createLayer(layerName);
    const layerRenderSystem = new RenderSystem({
      layer,
      cameraEntity,
    });

    world.addSystem(layerRenderSystem);
  }

  const cameraSystem = new CameraSystem(inputsEntity, game.time);

  world.addEntity(cameraEntity);
  world.addSystem(cameraSystem);

  scene.registerUpdateable(world);
  game.registerScene(scene);

  return {
    game,
    gameContainer,
    scene,
    imageCache,
    worldSpace,
    layerService,
    world,
    inputsEntity,
    inputSystem,
    cameraEntity,
    cameraSystem,
  };
}
