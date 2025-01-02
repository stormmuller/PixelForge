import { Component } from '../../ecs';

export interface AnimatedProperty {
  startValue: number;
  endValue: number;
  elapsed: number;
  duration: number;
  updateCallback: (value: number) => void;
  easing: (t: number) => number;
  loop?: LoopMode;
  loopCount?: number;
  finishedCallback?: () => void;
}

export type LoopMode = 'none' | 'loop' | 'pingpong';

export class AnimationComponent implements Component {
  public name: symbol;
  public animations: AnimatedProperty[];

  public static symbol = Symbol('Animation');

  constructor(animations: AnimatedProperty[] = []) {
    this.name = AnimationComponent.symbol;
    this.animations = animations;
  }

  public addAnimation = (animation: AnimatedProperty) => {
    this.animations.push(animation);
  }
}
