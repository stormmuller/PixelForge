import { Event } from '../../events';
import { Vector2 } from '../../math';

/**
 * Class to represent a 2D space with width, height, and center point.
 */
export class Space {
  /**
   * Event that is raised when the space changes.
   */
  public onSpaceChange: Event;

  private _center: Vector2;
  private _width: number;
  private _height: number;

  /**
   * Creates an instance of Space.
   * @param dimensions - The dimensions of the space.
   * @example
   * const space = new Space(new Vector2(800, 600));
   * console.log(space.width); // 800
   * console.log(space.height); // 600
   * console.log(space.center); // Vector2 { x: 400, y: 300 }
   */
  constructor(dimensions: Vector2) {
    this._width = dimensions.x;
    this._height = dimensions.y;

    this._center = this._calculateCenter(dimensions);

    this.onSpaceChange = new Event('space-change');
  }

  /**
   * Gets the center point of the space.
   * @returns The center point of the space.
   */
  get center() {
    return this._center;
  }

  /**
   * Gets the width of the space.
   * @returns The width of the space.
   */
  get width() {
    return this._width;
  }

  /**
   * Gets the height of the space.
   * @returns The height of the space.
   */
  get height() {
    return this._height;
  }

  /**
   * Sets the dimensions of the space.
   * @param dimensions - The new dimensions of the space.
   * @returns The updated Space instance.
   */
  public setValue(dimensions: Vector2): Space {
    this._width = dimensions.x;
    this._height = dimensions.y;

    this._center = this._calculateCenter(dimensions);

    this.onSpaceChange.raise();

    return this;
  }

  /**
   * Calculates the center point of the space based on its dimensions.
   * @param dimensions - The dimensions of the space.
   * @returns The center point of the space.
   */
  private _calculateCenter(dimensions: Vector2): Vector2 {
    return new Vector2(dimensions.x / 2, dimensions.y / 2);
  }
}
