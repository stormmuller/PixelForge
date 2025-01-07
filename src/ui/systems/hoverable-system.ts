import { PositionComponent, Space } from '../../common';
import { Entity, System } from '../../ecs';
import { InputsComponent } from '../../input';
import { BoxColliderComponent } from '../../physics';
import { CameraComponent, screenToWorldSpace } from '../../rendering';
import { HoverableComponent } from '../components';

export class HoverableSystem extends System {
  private _inputComponent: InputsComponent;
  private _camera: CameraComponent;
  private _cameraPosition: PositionComponent;
  private _worldSpace: Space;

  constructor(inputEntity: Entity, cameraEntity: Entity, worldSpace: Space) {
    super('hoverable', [
      BoxColliderComponent.symbol,
      HoverableComponent.symbol,
    ]);

    this._inputComponent = inputEntity.getComponentRequired<InputsComponent>(
      InputsComponent.symbol,
    );

    this._camera = cameraEntity.getComponentRequired<CameraComponent>(
      CameraComponent.symbol,
    );

    this._cameraPosition = cameraEntity.getComponentRequired<PositionComponent>(
      PositionComponent.symbol,
    );

    this._worldSpace = worldSpace;
  }

  public run = async (entity: Entity): Promise<void> => {
    const hoverable = entity.getComponentRequired<HoverableComponent>(
      HoverableComponent.symbol,
    );

    const collider = entity.getComponentRequired<BoxColliderComponent>(
      BoxColliderComponent.symbol,
    );

    const mouseWorldCoords = screenToWorldSpace(
      this._inputComponent.mouseCoordinates,
      this._cameraPosition,
      this._camera.zoom,
      this._worldSpace.center,
    );

    if (collider.boxCollider.contains(mouseWorldCoords)) {
      if (!hoverable.isHovered) {
        hoverable.isHovered = true;
        hoverable.onHoverStart?.();
      }

      hoverable.onHover?.();
    } else {
      if (hoverable.isHovered) {
        hoverable.isHovered = false;
        hoverable.onHoverEnd?.();
      }
    }
  };

  public stop = (): void => {};
}
