import seedrandom from 'seedrandom';

export class Random {
  private _rng: seedrandom.PRNG;

  constructor(seed: string) {
    this._rng = seedrandom(seed);
  }

  private _random(): number {
    return this._rng();
  }

  public randomInt(min: number, max: number): number {
    return Math.floor(this._random() * (max - min + 1)) + min;
  }

  public randomFloat(min: number, max: number): number {
    return this._random() * (max - min) + min;
  }
}
