import { Vector2 } from './Vector2';

export class BoundingBox {
  point: Vector2;
  dimentions: Vector2;

  constructor(point: Vector2, dimentions: Vector2) {
    this.point = point;
    this.dimentions = dimentions;
  }

  public get minX(): number {
    return this.point.x;
  }

  public get maxX(): number {
    return this.point.x + this.dimentions.x;
  }

  public get minY(): number {
    return this.point.y;
  }

  public get maxY(): number {
    return this.point.y + this.dimentions.y;
  }

  public get middleTop(): Vector2 {
    return new Vector2(this.point.x + this.dimentions.x / 2, this.minY);
  }

  public get middleBottom(): Vector2 {
    return new Vector2(this.point.x + this.dimentions.x / 2, this.maxY);
  }

  public get middleLeft(): Vector2 {
    return new Vector2(this.minX, this.point.y + this.dimentions.y / 2);
  }

  public get middleRight(): Vector2 {
    return new Vector2(this.maxX, this.point.y + this.dimentions.y / 2);
  }

  public contains(point: Vector2): boolean {
    const inXBounds = point.x >= this.minX && point.x <= this.maxX;
    const inYBounds = point.y >= this.minY && point.y <= this.maxY;

    return inXBounds && inYBounds;
  }

  public static combineBoundingBoxes(
    boundingBoxes: BoundingBox[],
  ): BoundingBox {
    if (boundingBoxes.length === 0) {
      throw new Error('No bounding boxes to combine');
    }

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (const box of boundingBoxes) {
      if (box.minX < minX) {
        minX = box.minX;
      }
      if (box.minY < minY) {
        minY = box.minY;
      }
      if (box.maxX > maxX) {
        maxX = box.maxX;
      }
      if (box.maxY > maxY) {
        maxY = box.maxY;
      }
    }

    return new BoundingBox(
      new Vector2(minX, minY),
      new Vector2(maxX - minX, maxY - minY),
    );
  }
}
