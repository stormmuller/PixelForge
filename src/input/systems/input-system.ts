import { Entity, System } from '../../ecs';
import { Vector2 } from '../../math';
import { InputsComponent } from '../components';

export class InputSystem extends System {
  private _scrollDelta: number = 0;
  private _keyPresses = new Set<string>();
  private _keyUps = new Set<string>();
  private _keyDowns = new Set<string>();
  private _mouseButtonPresses = new Set<number>();
  private _mouseButtonDowns = new Set<number>();
  private _mouseButtonUps = new Set<number>();
  private _mouseCoordinates = new Vector2();
  private _gameContainer: HTMLElement;

  constructor(gameContainer: HTMLElement) {
    super('input', [InputsComponent.symbol]);

    this._gameContainer = gameContainer;

    gameContainer.addEventListener('wheel', this.onWheelEventHandler);
    document.addEventListener('keydown', this.onKeyDownHandler);
    document.addEventListener('keyup', this.onKeyUpHandler);
    window.addEventListener('mousemove', this.updateCursorPosition, {
      passive: true,
    });
    window.addEventListener('mousedown', this.onMouseDownHandler);
    window.addEventListener('mouseup', this.onMouseUpHandler);
  }

  async run(entity: Entity): Promise<void> {
    const inputs = entity.getComponent(
      InputsComponent.symbol,
    ) as InputsComponent; // TODO: feature - Make singleton components?

    inputs.keyPresses = this._keyPresses;
    inputs.keyUps = this._keyUps;
    inputs.keyDowns = this._keyDowns;
    inputs.mouseButtonPresses = this._mouseButtonPresses;
    inputs.mouseButtonDowns = this._mouseButtonDowns;
    inputs.mouseButtonUps = this._mouseButtonUps;
    inputs.scrollDelta = this._scrollDelta;
    inputs.mouseCoordinates = this._mouseCoordinates;

    this.clearInputs();
  }

  shutdown(): void {
    this._gameContainer.removeEventListener('wheel', this.onWheelEventHandler);
    document.removeEventListener('keydown', this.onKeyDownHandler);
    document.removeEventListener('keyup', this.onKeyUpHandler);
    window.removeEventListener('mousemove', this.updateCursorPosition);
    window.removeEventListener('mousedown', this.onMouseDownHandler);
    window.removeEventListener('mouseup', this.onMouseUpHandler);
  }

  clearInputs = () => {
    this._scrollDelta = 0;
    this._keyDowns = new Set();
    this._keyUps = new Set();
    this._mouseButtonDowns = new Set();
    this._mouseButtonUps = new Set();
  };

  onWheelEventHandler = (event: WheelEvent) => {
    this._scrollDelta = event.deltaY;
    event.preventDefault();
  };

  onKeyUpHandler = (event: KeyboardEvent) => {
    this._keyPresses.delete(event.code);
    this._keyUps.add(event.code);
  };

  onKeyDownHandler = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }

    this._keyPresses.add(event.code);
    this._keyDowns.add(event.code);
  };

  updateCursorPosition = (event: MouseEvent) => {
    this._mouseCoordinates.x = event.clientX;
    this._mouseCoordinates.y = event.clientY;
  };

  onMouseDownHandler = (event: MouseEvent) => {
    this._mouseButtonPresses.add(event.button);
    this._mouseButtonDowns.add(event.button);
  };

  onMouseUpHandler = (event: MouseEvent) => {
    this._mouseButtonPresses.delete(event.button);
    this._mouseButtonUps.add(event.button);
  };
}
