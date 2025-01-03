import { PositionComponent, Space } from '../common';
import { Entity, World } from '../ecs';
import { Game, Scene } from '../game';
import { InputsComponent, InputSystem } from '../input';
import { Vector2 } from '../math';
import {
  CameraComponent,
  CameraSystem,
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
  layers: ['background', 'foreground', 'ui'],
  dimentions: new Vector2(window.innerWidth, window.innerHeight),
};

export function createGame(options: Partial<CreateGameOptions> = defaultOptions) {
  const mergedoptions = { ...defaultOptions, ...options };

  const game = new Game();

  const gameContainer = isString(mergedoptions.container)
    ? createContainer(mergedoptions.container)
    : mergedoptions.container;

  const scene = new Scene(mergedoptions.sceneName);
  const imageCache = new ImageCache();

  const worldSpace = new Space(mergedoptions.dimentions);
  const layerService = new LayerService(gameContainer);

  const world = new World(game);

  const inputsEntity = new Entity('inputs', [new InputsComponent()]);

  const inputSystem = new InputSystem(gameContainer);

  world.addEntity(inputsEntity);
  world.addSystem(inputSystem);

  const worldCamera = new Entity('world camera', [
    new CameraComponent(),
    new PositionComponent(worldSpace.center.x, worldSpace.center.y),
  ]);

  for (const layerName of mergedoptions.layers) {
    const layer = layerService.createLayer(layerName);
    const layerRenderSystem = new RenderSystem(layer, worldCamera, worldSpace);

    world.addSystem(layerRenderSystem);
  }

  const cameraSystem = new CameraSystem(inputsEntity, game.time);

  world.addEntity(worldCamera);
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
    worldCamera,
    cameraSystem,
  };
}