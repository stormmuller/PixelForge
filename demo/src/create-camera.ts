import { common, ecs, game, rendering } from '../../src';

export const createCameras = (
  world: ecs.World,
  worldSpace: common.Space,
  inputsEntity: ecs.Entity,
  game: game.Game,
) => {
  const worldCamera = new ecs.Entity('World Camera', [
    new rendering.CameraComponent(),
    new common.PositionComponent(worldSpace.center.x, worldSpace.center.y),
  ]);

  const cameraSystem = new rendering.CameraSystem(inputsEntity, game.time);

  world.addEntity(worldCamera);
  world.addSystem(cameraSystem);

  return worldCamera;
};
