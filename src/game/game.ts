import { Stoppable, Time } from '../common';
import { Event } from '../events';
import { Scene } from './scene';

export class Game implements Stoppable {
  time: Time;
  onWindowResize: Event;

  private _scenes: Set<Scene>;

  constructor() {
    this.time = new Time();
    this._scenes = new Set<Scene>();
    this.onWindowResize = new Event('window-resize');

    window.addEventListener('resize', () => {
      this.onWindowResize.raise;
    });
  }

  run = async (time = 0) => {
    this.time.update(time);

    const scenePromises: Promise<void>[] = [];

    for (const scene of this._scenes) {
      scenePromises.push(scene.update(this.time));
    }

    await Promise.all(scenePromises);

    requestAnimationFrame(this.run);
  };

  registerScene(scene: Scene) {
    this._scenes.add(scene);
  }

  deregisterScene(scene: Scene) {
    this._scenes.delete(scene);
  }

  stop() {
    window.removeEventListener('resize', this.onWindowResize.raise);

    for (const scene of this._scenes) {
      scene.stop();
    }
  }
}
