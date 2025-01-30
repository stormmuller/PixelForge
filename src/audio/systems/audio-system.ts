import { SoundComponent } from '../components';
import { Entity, System } from '../../ecs';

export class AudioSystem extends System {
  constructor() {
    super('sound', [SoundComponent.symbol]);
  }

  public run = async (entity: Entity): Promise<void> => {
    const soundComponent = entity.getComponentRequired<SoundComponent>(
      SoundComponent.symbol,
    );

    if (soundComponent.playSound) {
      soundComponent.sound.play();
      soundComponent.playSound = false;
    }
  };

  public stop = (): void => {};
}
