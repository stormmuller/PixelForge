import { Event } from '../../events';
import { Vector2 } from '../../math';

export class Space {
  public onSpaceChange: Event;

  private _center: Vector2;
  private _width: number;
  private _height: number;

  constructor(dimentions: Vector2) {
    this._width = dimentions.x;
    this._height = dimentions.y;

    this._center = this._calculateCenter(dimentions);

    this.onSpaceChange = new Event('space-change');
  }

  get center() {
    return this._center;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  public setValue = (dimentions: Vector2): Space => {
    this._width = dimentions.x;
    this._height = dimentions.y;

    this._center = this._calculateCenter(dimentions);

    this.onSpaceChange.raise();

    return this;
  };

  private _calculateCenter = (dimentions: Vector2): Vector2 => {
    return new Vector2(dimentions.x, dimentions.y);
  };
}
