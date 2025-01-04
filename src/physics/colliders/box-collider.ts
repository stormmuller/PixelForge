import { Vector2 } from "../../math";
import { Collider } from "./collider";

export class BoxCollider implements Collider<BoxCollider> {
  public point: Vector2;
  public dimentions: Vector2;

  constructor(point: Vector2, dimentions: Vector2) {
    this.point = point;
    this.dimentions = dimentions;
  }

  get minX(): number {
    return this.point.x;
  }

  get maxX(): number {
    return this.point.x + this.dimentions.x;
  }

  get minY(): number {
    return this.point.y;
  }

  get maxY(): number {
    return this.point.y + this.dimentions.y;
  }

  get middleTop(): Vector2 {
    return new Vector2(this.point.x + this.dimentions.x / 2, this.minY);
  }

  get middleBottom(): Vector2 {
    return new Vector2(this.point.x + this.dimentions.x / 2, this.maxY);
  }

  get middleLeft(): Vector2 {
    return new Vector2(this.minX, this.point.y + this.dimentions.y / 2);
  }

  get middleRight(): Vector2 {
    return new Vector2(this.maxX, this.point.y + this.dimentions.y / 2);
  }

  public contains = (point: Vector2): boolean => {
    const inXBounds = point.x >= this.minX && point.x <= this.maxX;
    const inYBounds = point.y >= this.minY && point.y <= this.maxY;

    return inXBounds && inYBounds;
  };

  public combine = (other: BoxCollider): BoxCollider => {
    const minX = Math.min(this.minX, other.minX);
    const minY = Math.min(this.minY, other.minY);
    const maxX = Math.max(this.maxX, other.maxX);
    const maxY = Math.max(this.maxY, other.maxY);

    return new BoxCollider(
      new Vector2(minX, minY),
      new Vector2(maxX - minX, maxY - minY),
    );    
  }

  public combineAll = (others: BoxCollider[]): BoxCollider => {
    let minX = this.minX;
    let minY = this.minY;
    let maxX = this.maxX;
    let maxY = this.maxY;

    for (const other of others) {
      if (other.minX < minX) {
        minX = other.minX;
      }
      if (other.minY < minY) {
        minY = other.minY;
      }
      if (other.maxX > maxX) {
        maxX = other.maxX;
      }
      if (other.maxY > maxY) {
        maxY = other.maxY;
      }
    }

    return new BoxCollider(
      new Vector2(minX, minY),
      new Vector2(maxX - minX, maxY - minY),
    );
  };

  public static fromOtherBoxes = (
    boxColliders: BoxCollider[],
  ): BoxCollider => {
    if (boxColliders.length === 0) {
      throw new Error('No boxes to combine');
    }

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (const box of boxColliders) {
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

    return new BoxCollider(
      new Vector2(minX, minY),
      new Vector2(maxX - minX, maxY - minY),
    );
  };
}
