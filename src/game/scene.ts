import { Stoppable, Time } from '../common';
import { Updateable } from './interfaces';

export class Scene implements Updateable, Stoppable {
  private _name: string;
  private _updateables: Set<Updateable>;
  private _stoppables: Set<Stoppable>;

  constructor(name: string) {
    this._name = name;
    this._updateables = new Set<Updateable>();
    this._stoppables = new Set<Stoppable>();
  }
  
  public registerUpdateable(updateable: Updateable) {
    this._updateables.add(updateable);
  }
  
  public deregisterUpdateable(updateable: Updateable) {
    this._updateables.delete(updateable);
  }

  public registerStoppable(stoppable: Stoppable) {
    this._stoppables.add(stoppable);
  }
  
  public deregisterStoppable(stoppable: Stoppable) {
    this._stoppables.delete(stoppable);
  }
  
  public async update(time: Time) {
    const updateablePromises: Promise<void>[] = [];
    
    for (const updateable of this._updateables) {
      updateablePromises.push(updateable.update(time));
    }
    
    await Promise.all(updateablePromises);
  }

  public stop() {
    for (const stoppable of this._stoppables) {
      stoppable.stop();
    }
  }
}
