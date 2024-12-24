import { Event } from '../../events';
import { Vector2 } from '../../math';

export class Space {
  private _center: Vector2;
  private _width: number;
  private _height: number;

  onSpaceChange: Event;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;

    this._center = this._calculateCenter(width, height);

    this.onSpaceChange = new Event('space-change');
  }

  public get center() {
    return this._center;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public setValue(newWidth: number, newHeight: number): Space {
    this._width = newWidth;
    this._height = newHeight;

    this._center = this._calculateCenter(newWidth, newHeight);

    this.onSpaceChange.raise();

    return this;
  }

  private _calculateCenter(width: number, height: number): Vector2 {
    return new Vector2(width / 2, height / 2);
  }
}
