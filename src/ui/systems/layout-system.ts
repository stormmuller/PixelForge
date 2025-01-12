import { Entity, System } from '../../ecs';
import { LayoutRootComponent } from '../components';
import { LayoutContainer } from '../layouts';

export class LayoutSystem extends System {
  constructor() {
    super('layout', [LayoutRootComponent.symbol]);
  }

  public beforeAll = async (entities: Entity[]) => {
    if (entities.length > 1) {
      throw new Error('Only one entity can have a layout root component');
    }

    return entities;
  };

  public run = async (entity: Entity): Promise<void> => {
    const layoutRootComponent =
      entity.getComponentRequired<LayoutRootComponent>(
        LayoutRootComponent.symbol,
      );

    this._updateContainer(layoutRootComponent);
  };

  public stop = (): void => {};

  private _updateContainer = (layoutContainer: LayoutContainer): void => {
    layoutContainer.layout.update(layoutContainer.children);

    for (const child of layoutContainer.children) {
      this._updateContainer(child);
    }
  };
}
