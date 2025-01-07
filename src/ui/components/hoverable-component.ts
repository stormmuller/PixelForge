import { Component } from '../../ecs';

export type HoverableComponentOptions = {
  onHover?: OnHoverCallback,
  onHoverStart?: OnHoverCallback,
  onHoverEnd?: OnHoverCallback,
};

export type OnHoverCallback = () => void;

export class HoverableComponent implements Component {
  public name: symbol;
  public onHover?: OnHoverCallback;
  public onHoverStart?: OnHoverCallback;
  public onHoverEnd?: OnHoverCallback;
  public isHovered: boolean = false;

  public static symbol = Symbol('Hoverable');

  constructor(options: HoverableComponentOptions = {}) {
    this.name = HoverableComponent.symbol;
    this.onHover = options.onHover;
    this.onHoverStart = options.onHoverStart;
    this.onHoverEnd = options.onHoverEnd;
  }
}
