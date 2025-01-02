import { Stoppable } from '../../common';
import { Entity } from '../entity';

export abstract class System implements Stoppable {
  public name: string;
  public operatesOnCompoents: symbol[];
  public isEnabled: boolean = true;

  constructor(name: string, operatesOnCompoents: symbol[]) {
    this.name = name;
    this.operatesOnCompoents = operatesOnCompoents;
  }

  public runSystem = async (entities: Entity[]) => {
    if (!this.isEnabled) {
      return;
    }

    const modifiedEntities = await this.beforeAll(entities);

    for (let i = 0; i < modifiedEntities.length; i++) {
      const entity = modifiedEntities[i];

      await this.run(entity);
    }
  };

  public abstract run(entity: Entity): Promise<void>;

  public beforeAll = async (entities: Entity[]) => {
    return entities;
  };

  public abstract stop(): void;
}
