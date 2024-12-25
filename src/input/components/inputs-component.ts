import { Component } from '../../ecs';
import { Vector2 } from '../../math';
import { MouseButton } from '../constants';

export class InputsComponent implements Component {
  public name: symbol;

  public scrollDelta: number = 0;
  public keyPresses = new Set<string>();
  public keyDowns = new Set<string>();
  public keyUps = new Set<string>();
  public mouseButtonPresses = new Set<number>();
  public mouseButtonDowns = new Set<number>();
  public mouseButtonUps = new Set<number>();
  public mouseCoordinates = new Vector2();

  public static symbol = Symbol('Inputs');

  constructor() {
    this.name = InputsComponent.symbol;
  }

  public keyPressed(code: string) {
    return this.keyPresses.has(code);
  }

  public keyPressedDown(code: string) {
    return this.keyDowns.has(code);
  }

  public keyPressedUp(code: string) {
    return this.keyUps.has(code);
  }

  public isMouseButtonDown(button: MouseButton) {
    return this.mouseButtonDowns.has(button);
  }

  public isMouseButtonUp(button: MouseButton) {
    return this.mouseButtonUps.has(button);
  }

  public isMouseButtonPressed(button: MouseButton) {
    return this.mouseButtonPresses.has(button);
  }
}
