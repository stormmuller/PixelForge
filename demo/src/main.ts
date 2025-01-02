import { utilities } from '@stormmuller/pixelforge';
import './style.css';
import { createBolt } from './create-bolt';
import { createAnimations } from './create-animation';
import { createText } from './create-text';

const {
  imageCache,
  world,
  game,
  layerService
} = utilities.createGame();

const foregroundRenderLayer = layerService.getLayer('foreground');
const backgroundRenderLayer = layerService.getLayer('background');

const boltEntity = await createBolt(imageCache, backgroundRenderLayer, world);
const textEntity = await createText(foregroundRenderLayer, world);

createAnimations(boltEntity, textEntity, game, world);

game.run();