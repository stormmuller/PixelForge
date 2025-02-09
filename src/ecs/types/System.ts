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

  public runSystem = (entities: Entity[]) => {
    if (!this.isEnabled) {
      return;
    }

    const modifiedEntities = this.beforeAll(entities);

    for (let i = 0; i < modifiedEntities.length; i++) {
      const entity = modifiedEntities[i];

      this.run(entity);
    }
  };

  public abstract run(entity: Entity): void;

  public beforeAll = (entities: Entity[]) => {
    return entities;
  };

  public stop = () => void 0;
}
