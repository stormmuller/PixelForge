import { OrNull } from '../common';
import type { Component } from './types';

export class Entity {
  components: Set<Component>;
  name: string;
  enabled: boolean;
  private _id: number;

  constructor(
    name: string,
    initialComponents: Component[],
    enabled: boolean = true,
  ) {
    this._id = Entity._generateId();
    this.components = new Set<Component>(initialComponents);
    this.name = name;
    this.enabled = enabled;
  }

  public get id() {
    return this._id;
  }

  addComponent = (component: Component) => {
    this.components.add(component);
  };

  checkIfEntityContainsAllComponents = (componentSymbols: symbol[]) => {
    let allSymbolsMatch = true;

    for (const symbol of componentSymbols) {
      let symbolMatched = false;

      for (const component of this.components) {
        if (component.name === symbol) {
          symbolMatched = true;
          break;
        }
      }

      if (!symbolMatched) {
        allSymbolsMatch = false;
        break;
      }
    }

    if (allSymbolsMatch) {
      return true;
    }

    return false;
  };

  getComponent = <T extends Component>(componentName: symbol): OrNull<T> => {
    for (const component of this.components) {
      if (component.name === componentName) {
        return component as T;
      }
    }

    return null;
  };

  getComponentRequired = <T extends Component>(componentName: symbol): T => {
    const component = this.getComponent<T>(componentName);

    if (component === null) {
      throw new Error(
        `Tried to get required component "${componentName.toString()}" but it is null on the entity "${this.name}"`,
      );
    }

    return component;
  };

  getComponents = <T extends Component>(
    componentNames: symbol[],
  ): OrNull<T>[] => {
    return componentNames.map(this.getComponent<T>);
  };

  removeComponent = (component: Component) => {
    this.components.delete(component);
  };

  private static _idCounter: number = 0;
  private static _generateId() {
    return Entity._idCounter++;
  }
}

export const filterEntitiesByComponents = (
  entities: Set<Entity>,
  componentSymbols: symbol[],
): Entity[] => {
  // TODO: performance - cache these look ups if possible

  const result: Entity[] = [];

  for (const entity of entities) {
    if (entity.checkIfEntityContainsAllComponents(componentSymbols)) {
      result.push(entity);
    }
  }

  return result;
};

export const getComponentsFromEntities = <T extends Component>(
  name: symbol,
  entites: Entity[],
): OrNull<T>[] => {
  const components = entites.map((entity) => entity.getComponent<T>(name));

  return components;
};
