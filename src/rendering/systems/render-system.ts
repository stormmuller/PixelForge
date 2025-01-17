import {
  isNil,
  PositionComponent,
  RotationComponent,
  ScaleComponent,
  Space,
} from '../../common';
import { Entity, System } from '../../ecs';
import { CameraComponent, SpriteComponent } from '../components';
import { RenderLayer } from '../render-layer';
import { GlowEffect, RenderEffects } from '../render-sources';
import { CLEAR_STRATEGY } from '../types';

export class RenderSystem extends System {
  private _layer: RenderLayer;
  private _worldSpace: Space;
  private _cameraPosition: PositionComponent;
  private _camera: CameraComponent;

  constructor(layer: RenderLayer, cameraEntity: Entity, worldSpace: Space) {
    super('renderer', [PositionComponent.symbol, SpriteComponent.symbol]);

    this._layer = layer;
    this._worldSpace = worldSpace;

    const cameraPosition = cameraEntity.getComponentRequired<PositionComponent>(
      PositionComponent.symbol,
    );

    if (isNil(cameraPosition)) {
      throw new Error(
        `The 'camera' provided to the ${this.name} system during construction is missing the "${PositionComponent.name}" component`,
      );
    }

    const camera = cameraEntity.getComponentRequired<CameraComponent>(
      CameraComponent.symbol,
    );

    if (isNil(camera)) {
      throw new Error(
        `The 'camera' provided to the ${this.name} system during construction is missing the "${CameraComponent.name}" component`,
      );
    }

    this._cameraPosition = cameraPosition;
    this._camera = camera;
  }

  public override beforeAll = async (entities: Entity[]) => {
    if (
      isNil(this._layer.clearStrategy) ||
      this._layer.clearStrategy === CLEAR_STRATEGY.blank
    ) {
      this._layer.context.clearRect(
        0,
        0,
        this._layer.context.canvas.width,
        this._layer.context.canvas.height,
      );
    }

    const sortedEntities = entities.sort((entity1, entity2) => {
      const position1 = entity1.getComponentRequired<PositionComponent>(
        PositionComponent.symbol,
      );

      const spriteComponent1 = entity1.getComponentRequired<SpriteComponent>(
        SpriteComponent.symbol,
      );

      const position2 = entity2.getComponentRequired<PositionComponent>(
        PositionComponent.symbol,
      );

      const spriteComponent2 = entity2.getComponentRequired<SpriteComponent>(
        SpriteComponent.symbol,
      );

      return (
        position1.y -
        spriteComponent1.sprite.pivot.y -
        (position2.y - spriteComponent2.sprite.pivot.y)
      );
    });

    return sortedEntities;
  };

  public run = async (entity: Entity): Promise<void> => {
    const spriteComponent = entity.getComponentRequired<SpriteComponent>(
      SpriteComponent.symbol,
    );

    if (spriteComponent.renderLayer !== this._layer) {
      return; // Probably not the best way to handle layers/sprite, but the alternatives have their own issues.
    }

    if (!spriteComponent.enabled) {
      return;
    }

    const position = entity.getComponentRequired<PositionComponent>(
      PositionComponent.symbol,
    );

    const scale = entity.getComponent<ScaleComponent>(ScaleComponent.symbol);

    const rotation = entity.getComponent<RotationComponent>(
      RotationComponent.symbol,
    );

    this._layer.context.translate(
      this._worldSpace.center.x,
      this._worldSpace.center.y,
    );

    // Apply zoom and translate based on the camera position
    this._layer.context.scale(this._camera.zoom, this._camera.zoom);

    this._layer.context.translate(
      -this._cameraPosition.x,
      -this._cameraPosition.y,
    );

    // Translate to the position of the entity
    this._layer.context.translate(position.x, position.y);

    if (rotation) {
      this._layer.context.rotate(rotation.radians);
    }

    this._layer.context.scale(scale?.x ?? 1, scale?.y ?? 1);

    // Translate based on the pivot point of the sprite
    this._layer.context.translate(
      -spriteComponent.sprite.pivot.x,
      -spriteComponent.sprite.pivot.y,
    );

    this._renderPreProcessingEffects(
      spriteComponent.sprite.renderSource.renderEffects,
    );

    spriteComponent.sprite.renderSource.render(this._layer);

    this._resetCanvas();
  };

  private _resetCanvas = () => {
    // Reset transformation matrix
    this._layer.context.setTransform(1, 0, 0, 1, 0, 0);

    // Reset filter
    this._layer.context.filter = 'none';

    // reset glow
    this._layer.context.shadowColor = 'rgba(0, 0, 0, 0)';
    this._layer.context.shadowBlur = 0;
    this._layer.context.globalAlpha = 1;
  };

  private _renderPreProcessingEffects = (renderEffects: RenderEffects) => {
    this._renderGlow(renderEffects.glow);
    this._adjustOpacity(renderEffects.opacity);
  };

  private _renderGlow = (glow?: GlowEffect) => {
    if (!glow) {
      return;
    }

    this._layer.context.shadowColor = glow.color;
    this._layer.context.shadowBlur = glow.radius;
  };

  private _adjustOpacity = (opacity?: number) => {
    if (!opacity) {
      return;
    }

    this._layer.context.globalAlpha = opacity;
  };

  public stop = (): void => {};
}
