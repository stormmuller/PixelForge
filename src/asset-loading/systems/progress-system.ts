import { Entity, System } from '../../ecs';
import { ProgressComponent } from '../components';

export class ProgressSystem extends System {
  constructor() {
    super('progress', [ProgressComponent.symbol]);
  }

  public run = async (entity: Entity): Promise<void> => {
    const progressComponent = entity.getComponentRequired<ProgressComponent>(
      ProgressComponent.symbol,
    );

    console.log(progressComponent.calculateProgress());
  };

  public stop = (): void => {};
}
