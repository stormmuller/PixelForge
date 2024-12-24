import { Component } from '../../ecs';
import { Vector2 } from '../../math';
import { MouseButton } from '../constants';

export class InputsComponent implements Component {
  name: symbol;

  scrollDelta: number = 0;
  keyPresses = new Set<string>();
  keyDowns = new Set<string>();
  keyUps = new Set<string>();
  mouseButtonPresses = new Set<number>();
  mouseButtonDowns = new Set<number>();
  mouseButtonUps = new Set<number>();
  mouseCoordinates = new Vector2();

  static symbol = Symbol('Inputs');

  constructor() {
    this.name = InputsComponent.symbol;
  }

  keyPressed = (code: string) => {
    return this.keyPresses.has(code);
  };

  keyPressedDown = (code: string) => {
    return this.keyDowns.has(code);
  };

  keyPressedUp = (code: string) => {
    return this.keyUps.has(code);
  };

  isMouseButtonDown = (button: MouseButton): boolean => {
    return this.mouseButtonDowns.has(button);
  }

  isMouseButtonUp = (button: MouseButton): boolean => {
    return this.mouseButtonUps.has(button);
  }

  isMouseButtonPressed = (button: MouseButton): boolean => {
    return this.mouseButtonPresses.has(button);
  }
}
