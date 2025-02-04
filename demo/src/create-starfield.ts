import { ecs } from '../../src';
import { StarfieldComponent } from './starfield';

export const createStarfield = async (world: ecs.World) => {
  const starfieldComponent = new StarfieldComponent(10);
  const starfieldEntity = new ecs.Entity('starfield', [starfieldComponent]);

  world.addEntity(starfieldEntity);

  return starfieldEntity;
};
