import { Stoppable } from '../common';
import { Game } from '../game';
import { Updateable } from '../game/interfaces';
import { Entity, filterEntitiesByComponents } from './entity';
import type { System } from './types';

export class World implements Updateable, Stoppable {
  onSystemsChangedCallbacks = new Set<(systems: Set<System>) => void>();
  onEntitiesChangedCallbacks = new Set<(entities: Set<Entity>) => void>();

  systems = new Set<System>();
  entities = new Set<Entity>();
  systemEntities = new Map<string, Entity[]>();

  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async update() {
    const systemPromises: Promise<void>[] = [];

    for (const system of this.systems) {
      const entities = this.systemEntities.get(system.name);

      if (!entities) {
        throw new Error(`Unable to get entities for system ${system.name}`);
      }

      const enabledEntities = entities.filter(e => e.enabled);

      systemPromises.push(system.runSystem(enabledEntities));
    }

    await Promise.all(systemPromises);
  }

  onSystemsChanged = (callback: (systems: Set<System>) => void) => {
    this.onSystemsChangedCallbacks.add(callback);
  };

  onEntitiesChanged = (callback: (entities: Set<Entity>) => void) => {
    this.onEntitiesChangedCallbacks.add(callback);
  };

  removeOnSystemsChangedCallback = (
    callback: (systems: Set<System>) => void,
  ) => {
    this.onSystemsChangedCallbacks.delete(callback);
  };

  removeOnEntitiesChangedCallback = (
    callback: (entities: Set<Entity>) => void,
  ) => {
    this.onEntitiesChangedCallbacks.delete(callback);
  };

  raiseOnSystemsChangedEvent = () => {
    for (const callback of this.onSystemsChangedCallbacks) {
      callback(this.systems);
    }
  };

  raiseOnEntitiesChangedEvent = () => {
    for (const callback of this.onEntitiesChangedCallbacks) {
      callback(this.entities);
    }
  };

  addSystem = (system: System) => {
    this.systems.add(system);
    this.systemEntities.set(
      system.name,
      filterEntitiesByComponents(this.entities, system.operatesOnCompoents),
    );

    this.raiseOnSystemsChangedEvent();

    return this;
  };

  addSystems = (systems: System[]) => {
    systems.forEach(this.addSystem);
    this.raiseOnSystemsChangedEvent();

    return this;
  };

  removeSystem = (system: System) => {
    this.systems.delete(system);
    this.systemEntities.delete(system.name);
    this.raiseOnSystemsChangedEvent();

    return this;
  };

  addEntity = (entity: Entity) => {
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

  addEntities = (entities: Entity[]) => {
    entities.forEach(this.addEntity);
    this.raiseOnEntitiesChangedEvent();

    return this;
  };

  removeEntity = (entity: Entity) => {
    this.entities.delete(entity);
    this.raiseOnEntitiesChangedEvent();

    return this;
  };

  stop() {
    for (const system of this.systems) {
      system.stop();
    }
  }
}
