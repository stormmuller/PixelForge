import { PositionComponent } from '../../common';
import { Entity, System } from '../../ecs';
import { Vector2 } from '../../math';
import { CursorComponent } from '../components';

export class MousePointerSystem extends System {
  private _mouseCoordinates = new Vector2();

  constructor() {
    super('mouse-pointer', [PositionComponent.symbol, CursorComponent.symbol]);

    window.addEventListener('mousemove', this.updateCursorPosition, {
      passive: true,
    });
  }

  updateCursorPosition = (event: MouseEvent) => {
    this._mouseCoordinates.x = event.clientX;
    this._mouseCoordinates.y = event.clientY;
  };

  async run(entity: Entity): Promise<void> {
    const position = entity.getComponentRequired<PositionComponent>(
      PositionComponent.symbol,
    );

    position.set(this._mouseCoordinates);
  }

  shutdown(): void {
    window.removeEventListener('mousemove', this.updateCursorPosition);
  }
}
