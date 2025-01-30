import { Rive } from '@rive-app/canvas';
import { utilities } from '../../src';
import './style.css';
import { createBolt } from './create-bolt';
import { createAnimations } from './create-animation';
import { createText } from './create-text';

const { imageCache, world, game, layerService } = utilities.createGame({
  container: document.getElementById('game-container') as HTMLDivElement,
});

const foregroundRenderLayer = layerService.getLayer('foreground');
const backgroundRenderLayer = layerService.getLayer('background');

const boltEntity = await createBolt(imageCache, backgroundRenderLayer, world);
const textEntity = await createText(foregroundRenderLayer, world);

createAnimations(boltEntity, textEntity, game, world);

game.run();

const riveRenderLayer = layerService.createLayer('rive', {
  clearStrategy: 'none',
});

const r = new Rive({
  src: './ui.riv',
  canvas: riveRenderLayer.canvas,
  autoplay: true,
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
  },
});

const onWindowResize = () => {
  layerService.resizeAllLayers();
  r.resizeDrawingSurfaceToCanvas();
};

window.addEventListener('resize', onWindowResize);
