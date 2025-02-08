import { Stoppable, Time } from '../common';
import { Updatable } from './interfaces';

export class Scene implements Updatable, Stoppable {
  public name: string;

  private _updatables: Set<Updatable>;
  private _stoppables: Set<Stoppable>;

  constructor(name: string) {
    this.name = name;

    this._updatables = new Set<Updatable>();
    this._stoppables = new Set<Stoppable>();
  }

  public registerUpdatable = (updatable: Updatable) => {
    this._updatables.add(updatable);
  };

  public deregisterUpdatable = (updatable: Updatable) => {
    this._updatables.delete(updatable);
  };

  public registerStoppable = (stoppable: Stoppable) => {
    this._stoppables.add(stoppable);
  };

  public deregisterStoppable = (stoppable: Stoppable) => {
    this._stoppables.delete(stoppable);
  };

  public update = (time: Time) => {
    for (const updatable of this._updatables) {
      updatable.update(time);
    }
  };

  public stop = () => {
    for (const stoppable of this._stoppables) {
      stoppable.stop();
    }
  };
}
