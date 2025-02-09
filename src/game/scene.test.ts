import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Scene } from './scene';
import { Stoppable, Time } from '../common';
import { Updatable } from './interfaces';

class TestUpdatable implements Updatable {
  public update = vi.fn();
}

class TestStoppable implements Stoppable {
  public stop = vi.fn();
}

describe('Scene', () => {
  let scene: Scene;
  let updatable: TestUpdatable;
  let stoppable: TestStoppable;
  let time: Time;

  beforeEach(() => {
    scene = new Scene('TestScene');
    updatable = new TestUpdatable();
    stoppable = new TestStoppable();
    time = new Time();
  });

  it('should initialize with the given name', () => {
    expect(scene.name).toBe('TestScene');
  });

  it('should update all registered updatable objects', () => {
    scene.registerUpdatable(updatable);
    scene.update(time);
    expect(updatable.update).toHaveBeenCalledWith(time);
  });

  it('should stop all registered stoppable objects', () => {
    scene.registerStoppable(stoppable);
    scene.stop();
    expect(stoppable.stop).toHaveBeenCalled();
  });
});
