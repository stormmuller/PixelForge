import { Component } from '../../ecs';

export class ProgressComponent implements Component {
  name: symbol;
  private progress: number;
  total: number;

  static symbol = Symbol('Progress');

  constructor(total: number) {
    this.name = ProgressComponent.symbol;
    this.progress = 0;
    this.total = total;
  }

  include = (total: number) => {
    this.total += total;
  };

  calculateProgress = () => {
    return this.progress / this.total; // TODO: feature - potentially prevent the reported progress from dropping (clamp it what ever it was previously and greater)
  };

  increment = () => {
    this.progress++;
  };
}
