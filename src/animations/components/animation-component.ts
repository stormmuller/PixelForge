import { Component } from '../../ecs';

export type LoopMode = 'none' | 'loop' | 'pingpong';

export interface AnimatedProperty {
  startValue: number;
  endValue: number;
  elapsed: number;
  duration: number;
  updateCallback: (value: number) => void;
  easing: (t: number) => number;
  loop?: LoopMode;
  loopCount?: number;
  finishedCallback?: () => void
}

export class AnimationComponent implements Component {
  public name: symbol;
  public animations: AnimatedProperty[];

  static symbol = Symbol('Animation');

  constructor(animations: AnimatedProperty[] = []) {
    this.name = AnimationComponent.symbol;
    this.animations = animations;
  }

  addAnimation(animation: AnimatedProperty) {
    this.animations.push(animation);
  }
}
