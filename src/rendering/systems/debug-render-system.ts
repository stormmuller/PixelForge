import { PositionComponent, Space } from '../../common';
import * as transforms from '../transforms';
import { Entity, System } from '../../ecs';
import { CameraComponent, DebugDotComponent } from '../components';
import { RenderLayer } from '../types';

export class DebugRenderSystem extends System {
  private _layer: RenderLayer;
  private _cameraComponent: CameraComponent;
  private _cameraPosition: PositionComponent;
  private _worldSpace: Space;

  constructor(layer: RenderLayer, camera: Entity, worldSpace: Space) {
    super('debug-renderer', [
      PositionComponent.symbol,
      DebugDotComponent.symbol,
    ]);

    this._layer = layer;

    this._cameraComponent = camera.getComponentRequired<CameraComponent>(
      CameraComponent.symbol,
    );

    this._cameraPosition = camera.getComponentRequired<PositionComponent>(
      PositionComponent.symbol,
    );

    this._worldSpace = worldSpace;
  }

  async run(entity: Entity): Promise<void> {
    const position = entity.getComponent<PositionComponent>(
      PositionComponent.symbol,
    ) as PositionComponent;

    const debugDot = entity.getComponent<DebugDotComponent>(
      DebugDotComponent.symbol,
    ) as DebugDotComponent;

    const screenPosition = transforms.worldToScreenSpace(
      position,
      this._cameraPosition,
      this._cameraComponent.zoom,
      this._worldSpace.center,
    );

    this._layer.context.fillStyle = debugDot.color;
    this._layer.context.beginPath();
    this._layer.context.arc(
      screenPosition.x,
      screenPosition.y,
      debugDot.radius,
      0,
      Math.PI * 2,
      false,
    );
    this._layer.context.fill();
  }
}
