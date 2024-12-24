import { Stoppable } from '../../common';
import { Entity } from '../entity';

export abstract class System implements Stoppable {
  name: string;
  operatesOnCompoents: symbol[];
  isEnabled: boolean = true;

  constructor(name: string, operatesOnCompoents: symbol[]) {
    this.name = name;
    this.operatesOnCompoents = operatesOnCompoents;
  }

  async runSystem(entities: Entity[]) {
    if (!this.isEnabled) {
      return;
    }

    const modifiedEntities = await this.beforeAll(entities);

    for (let i = 0; i < modifiedEntities.length; i++) {
      const entity = modifiedEntities[i];

      await this.run(entity);
    }
  }

  abstract run(entity: Entity): Promise<void>;
  
  async beforeAll (entities: Entity[]) {
    return entities;
  }

  stop() {}
}
