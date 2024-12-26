import { common, ecs, game, rendering } from '@stormmuller/pixelforge';
import './style.css';
import { createCameras } from './create-camera';
import { createInputs } from './create-inputs';
import { createRenderLayer } from './create-render-layer';
import { createBolt } from './create-bolt';
import { createAnimations } from './create-animation';
import { createText } from './create-text';

const demoGame = new game.Game();
const gameContainer = document.getElementById("game") as HTMLDivElement;

const demoScene = new game.Scene('demo');
const imageCache = new rendering.ImageCache();

const worldSpace = new common.Space(window.innerWidth, window.innerHeight);
const layerService = new rendering.LayerService(gameContainer);

const world = new ecs.World(demoGame);

const inputsEntity = createInputs(world, gameContainer);
const cameraEntity = createCameras(world, worldSpace, inputsEntity, demoGame);
const foregroundRenderLayer = createRenderLayer(layerService, cameraEntity, worldSpace, world);

const boltEntity = await createBolt(imageCache, foregroundRenderLayer, world);
const textEntity = await createText(foregroundRenderLayer, world);

createAnimations(boltEntity, textEntity, demoGame, world);

demoScene.registerUpdateable(world);	
demoGame.registerScene(demoScene);

demoGame.run();