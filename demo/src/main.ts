import { animations, utilities } from '../../src';
import './style.css';
import { createShip } from './create-ship';
import { DEFAULT_LAYERS } from '../../src/rendering';
import { ShipMovementSystem } from './ship';
import { createStarfield } from './create-starfield';
import { StarfieldSystem } from './starfield';

const { imageCache, world, game, layerService, inputsEntity } =
  await utilities.createGame({
    container: document.getElementById('game-container') as HTMLDivElement,
    layers: ['foreground'],
  });

const foregroundRenderLayer = layerService.getLayer(DEFAULT_LAYERS.foreground);

await createShip(imageCache, foregroundRenderLayer, world);
createStarfield(world);

const shipMovementSystem = new ShipMovementSystem(inputsEntity, game.time);
const starfieldSystem = new StarfieldSystem(
  world,
  imageCache,
  foregroundRenderLayer,
);
const animationSystem = new animations.AnimationSystem(game.time);

world.addSystems([shipMovementSystem, starfieldSystem, animationSystem]);

game.run();
