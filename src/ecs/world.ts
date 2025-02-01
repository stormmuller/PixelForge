import { Stoppable } from '../common';
import { Game } from '../game';
import { Updateable } from '../game/interfaces';
import { Entity, filterEntitiesByComponents } from './entity';
import type { System } from './types';

export class World implements Updateable, Stoppable {
  public onSystemsChangedCallbacks = new Set<(systems: Set<System>) => void>();
  public onEntitiesChangedCallbacks = new Set<
    (entities: Set<Entity>) => void
  >();

  public systems = new Set<System>();
  public entities = new Set<Entity>();
  public systemEntities = new Map<string, Entity[]>();

  public game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public update = () => {
    for (const system of this.systems) {
      const entities = this.systemEntities.get(system.name);

      if (!entities) {
        throw new Error(`Unable to get entities for system ${system.name}`);
      }

      const enabledEntities = entities.filter((e) => e.enabled);

      system.runSystem(enabledEntities);
    }
  };

  public onSystemsChanged = (callback: (systems: Set<System>) => void) => {
    this.onSystemsChangedCallbacks.add(callback);
  };

  public onEntitiesChanged = (callback: (entities: Set<Entity>) => void) => {
    this.onEntitiesChangedCallbacks.add(callback);
  };

  public removeOnSystemsChangedCallback = (
    callback: (systems: Set<System>) => void,
  ) => {
    this.onSystemsChangedCallbacks.delete(callback);
  };

  public removeOnEntitiesChangedCallback = (
    callback: (entities: Set<Entity>) => void,
  ) => {
    this.onEntitiesChangedCallbacks.delete(callback);
  };

  public raiseOnSystemsChangedEvent = () => {
    for (const callback of this.onSystemsChangedCallbacks) {
      callback(this.systems);
    }
  };

  public raiseOnEntitiesChangedEvent = () => {
    for (const callback of this.onEntitiesChangedCallbacks) {
      callback(this.entities);
    }
  };

  public addSystem = (system: System) => {
    this.systems.add(system);
    this.systemEntities.set(
      system.name,
      filterEntitiesByComponents(this.entities, system.operatesOnCompoents),
    );

    this.raiseOnSystemsChangedEvent();

    return this;
  };

  public addSystems = (systems: System[]) => {
    systems.forEach(this.addSystem);
    this.raiseOnSystemsChangedEvent();

    return this;
  };

  public removeSystem = (system: System) => {
    this.systems.delete(system);
    this.systemEntities.delete(system.name);
    this.raiseOnSystemsChangedEvent();

    return this;
  };

  public addEntity = (entity: Entity) => {
    this.entities.add(entity);

    this.systems.forEach((system) => {
      if (
        entity.checkIfEntityContainsAllComponents(system.operatesOnCompoents)
      ) {
        const entities = this.systemEntities.get(system.name);

        if (!entities) {
          throw new Error(`Unable to get entities for system ${system.name}`);
        }

        entities.push(entity);
      }
    });

    this.raiseOnEntitiesChangedEvent();

    return this;
  };

  public addEntities = (entities: Entity[]) => {
    entities.forEach(this.addEntity);
    this.raiseOnEntitiesChangedEvent();

    return this;
  };

  public removeEntity = (entity: Entity) => {
    this.entities.delete(entity);
    this.raiseOnEntitiesChangedEvent();

    return this;
  };

  public stop = () => {
    for (const system of this.systems) {
      system.stop();
    }
  };
}
