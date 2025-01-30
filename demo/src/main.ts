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

const riveCanvas = document.getElementById('rive-canvas') as HTMLCanvasElement;

layerService.registerLayer('rive', riveCanvas);

const r = new Rive({
  src: './ui.riv',
  canvas: riveCanvas,
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
