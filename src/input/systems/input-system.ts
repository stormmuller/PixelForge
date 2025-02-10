import { Entity, System } from '../../ecs';
import { Vector2 } from '../../math';
import { InputsComponent } from '../components';

/**
 * The `InputSystem` class. It tracks key presses,
 * mouse button presses, mouse coordinates, and scroll delta values.
 */
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

  /**
   * Constructs a new instance of the `InputSystem` class and sets up event listeners
   * for various input events.
   * @param gameContainer - The HTML element that contains the game.
   */
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

  /**
   * Runs the input system for the given entity, updating its `InputsComponent`
   * with the current input states.
   * @param entity - The entity to update.
   */
  public run = async (entity: Entity): Promise<void> => {
    const inputs = entity.getComponentRequired<InputsComponent>(
      InputsComponent.symbol,
    );

    inputs.keyPresses = this._keyPresses;
    inputs.keyUps = this._keyUps;
    inputs.keyDowns = this._keyDowns;
    inputs.mouseButtonPresses = this._mouseButtonPresses;
    inputs.mouseButtonDowns = this._mouseButtonDowns;
    inputs.mouseButtonUps = this._mouseButtonUps;
    inputs.scrollDelta = this._scrollDelta;
    inputs.mouseCoordinates = this._mouseCoordinates;

    this.clearInputs();
  };

  /**
   * Stops the input system, removing all event listeners.
   */
  public override stop = (): void => {
    this._gameContainer.removeEventListener('wheel', this.onWheelEventHandler);
    document.removeEventListener('keydown', this.onKeyDownHandler);
    document.removeEventListener('keyup', this.onKeyUpHandler);
    window.removeEventListener('mousemove', this.updateCursorPosition);
    window.removeEventListener('mousedown', this.onMouseDownHandler);
    window.removeEventListener('mouseup', this.onMouseUpHandler);
  };

  /**
   * Clears the current input states.
   */
  public clearInputs = () => {
    this._scrollDelta = 0;
    this._keyDowns = new Set();
    this._keyUps = new Set();
    this._mouseButtonDowns = new Set();
    this._mouseButtonUps = new Set();
  };

  /**
   * Handles the wheel event, updating the scroll delta value.
   * @param event - The wheel event.
   */
  public onWheelEventHandler = (event: WheelEvent) => {
    this._scrollDelta = event.deltaY;
    event.preventDefault();
  };

  /**
   * Handles the key up event, updating the key press and key up states.
   * @param event - The keyboard event.
   */
  public onKeyUpHandler = (event: KeyboardEvent) => {
    this._keyPresses.delete(event.code);
    this._keyUps.add(event.code);
  };

  /**
   * Handles the key down event, updating the key press and key down states.
   * @param event - The keyboard event.
   */
  public onKeyDownHandler = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }

    this._keyPresses.add(event.code);
    this._keyDowns.add(event.code);
  };

  /**
   * Updates the mouse cursor position.
   * @param event - The mouse event.
   */
  public updateCursorPosition = (event: MouseEvent) => {
    this._mouseCoordinates.x = event.clientX;
    this._mouseCoordinates.y = event.clientY;
  };

  /**
   * Handles the mouse down event, updating the mouse button press and mouse button down states.
   * @param event - The mouse event.
   */
  public onMouseDownHandler = (event: MouseEvent) => {
    this._mouseButtonPresses.add(event.button);
    this._mouseButtonDowns.add(event.button);
  };

  /**
   * Handles the mouse up event, updating the mouse button press and mouse button up states.
   * @param event - The mouse event.
   */
  public onMouseUpHandler = (event: MouseEvent) => {
    this._mouseButtonPresses.delete(event.button);
    this._mouseButtonUps.add(event.button);
  };
}
