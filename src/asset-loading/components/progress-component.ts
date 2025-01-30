import { Component } from '../../ecs';

export class ProgressComponent implements Component {
  public name: symbol;
  public total: number;

  private _progress: number;

  public static symbol = Symbol('Progress');

  constructor(total: number) {
    this.name = ProgressComponent.symbol;
    this._progress = 0;
    this.total = total;
  }

  public include = (total: number) => {
    this.total += total;
  };

  public calculateProgress = () => {
    return this._progress / this.total; // TODO: feature - potentially prevent the reported progress from dropping (clamp it what ever it was previously and greater)
  };

  public increment = () => {
    this._progress++;
  };
}
