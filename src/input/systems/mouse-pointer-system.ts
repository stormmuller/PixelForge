import { PositionComponent } from '../../common';
import { Entity, System } from '../../ecs';
import { Vector2 } from '../../math';
import { CursorComponent } from '../components';

/**
 * The `MousePointerSystem` class extends the `System` class and handles updating
 * the position of entities with a `CursorComponent` based on the mouse cursor's position.
 */
export class MousePointerSystem extends System {
  private _mouseCoordinates = new Vector2();

  /**
   * Constructs a new instance of the `MousePointerSystem` and sets up an event listener
   * for the mouse move event to track the mouse cursor's position.
   */
  constructor() {
    super('mouse-pointer', [PositionComponent.symbol, CursorComponent.symbol]);

    window.addEventListener('mousemove', this._updateCursorPosition, {
      passive: true,
    });
  }

  /**
   * Runs the mouse pointer system for the given entity, updating its `PositionComponent`
   * with the current mouse coordinates.
   * @param entity - The entity to update.
   */
  public run = async (entity: Entity): Promise<void> => {
    const position = entity.getComponentRequired<PositionComponent>(
      PositionComponent.symbol,
    );

    position.set(this._mouseCoordinates);
  };

  /**
   * Shuts down the mouse pointer system, removing the mouse move event listener.
   */
  public shutdown = (): void => {
    window.removeEventListener('mousemove', this._updateCursorPosition);
  };

  /**
   * Updates the mouse cursor position.
   * @param event - The mouse event.
   */
  private _updateCursorPosition = (event: MouseEvent) => {
    this._mouseCoordinates.x = event.clientX;
    this._mouseCoordinates.y = event.clientY;
  };
}
