import { ecs, input } from '@stormmuller/pixelforge';

export const createInputs = (world: ecs.World, gameContainer: HTMLElement) => {
  const inputsEntity = new ecs.Entity('input', [new input.InputsComponent()]);

  const inputSystem = new input.InputSystem(gameContainer);

  world.addEntity(inputsEntity);
  world.addSystem(inputSystem);

  return inputsEntity;
};
