import { System, Entity } from '../../ecs';
import { Time } from '../../common';
import { AnimatedProperty, AnimationComponent } from '../components';

export class AnimationSystem extends System {
  private _time: Time;

  constructor(time: Time) {
    super('animation', [AnimationComponent.symbol]);
    this._time = time;
  }

  async run(entity: Entity): Promise<void> {
    const animationComponent = entity.getComponentRequired<AnimationComponent>(
      AnimationComponent.symbol,
    );

    if (animationComponent.animations.length === 0) {
      return;
    }

    const deltaTime = this._time.deltaTime;

    // Iterate backwards so we can safely remove animations
    for (let i = animationComponent.animations.length - 1; i >= 0; i--) {
      const animation = animationComponent.animations[i];
      const animationComplete = this.updateAnimation(animation, deltaTime);

      if (animationComplete) {
        // Animation reached the end value
        animation.updateCallback(animation.endValue);

        // Handle looping and remove if needed
        const shouldRemove = !this.handleLooping(animation);
        
        if (shouldRemove) {
          animation.finishedCallback?.();
          animationComponent.animations.splice(i, 1);
        }
      }
    }
  }

  private updateAnimation(
    animation: AnimatedProperty,
    deltaTime: number,
  ): boolean {
    animation.elapsed += deltaTime;

    let t = animation.elapsed / animation.duration;
    if (t > 1) t = 1;

    const factor = animation.easing ? animation.easing(t) : t;
    const currentValue =
      animation.startValue +
      (animation.endValue - animation.startValue) * factor;

    animation.updateCallback(currentValue);

    return t >= 1;
  }

  private handleLooping(animation: AnimatedProperty): boolean {
    if (!animation.loop || animation.loop === 'none') {
      return false; // No looping, remove the animation
    }

    // If loopCount is provided, decrement it
    if (animation.loopCount !== undefined && animation.loopCount !== null) {
      animation.loopCount--;
      if (animation.loopCount <= 0) {
        return false; // No more loops allowed
      }
    }

    animation.elapsed = 0;

    if (animation.loop === 'loop') {
      animation.updateCallback(animation.startValue);
    } else if (animation.loop === 'pingpong') {
      // Swap start and end for next iteration
      const temp = animation.startValue;
      animation.startValue = animation.endValue;
      animation.endValue = temp;

      // Start again at the new startValue
      animation.updateCallback(animation.startValue);
    }

    return true;
  }
}
