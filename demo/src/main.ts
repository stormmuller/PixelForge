import { ui, utilities } from '@stormmuller/pixelforge';
import './style.css';
import { createBolt } from './create-bolt';
import { createAnimations } from './create-animation';
import { createText } from './create-text';
import { createMenu } from './create-menu';

const {
  imageCache,
  world,
  game,
  layerService,
  inputsEntity,
  worldCamera,
  worldSpace,
} = utilities.createGame();

const foregroundRenderLayer = layerService.getLayer('foreground');
const backgroundRenderLayer = layerService.getLayer('background');

const boltEntity = await createBolt(imageCache, backgroundRenderLayer, world);
const textEntity = await createText(foregroundRenderLayer, world);

createAnimations(boltEntity, textEntity, game, world);

createMenu(world, foregroundRenderLayer);

const hoverableSystem = new ui.HoverableSystem(
  inputsEntity,
  worldCamera,
  worldSpace,
);

world.addSystem(hoverableSystem);

game.run();
