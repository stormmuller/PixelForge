export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  set(value: Vector2) {
    this.x = value.x;
    this.y = value.y;
  }

  add(value: Vector2): Vector2 {
    const x = this.x + value.x;
    const y = this.y + value.y;

    return new Vector2(x, y);
  }

  subtract(value: Vector2): Vector2 {
    const x = this.x - value.x;
    const y = this.y - value.y;

    return new Vector2(x, y);
  }

  multiply(scalar: number): Vector2 {
    const x = this.x * scalar;
    const y = this.y * scalar;

    return new Vector2(x, y);
  }

  multiplyComponents(vector: Vector2): Vector2 {
    const x = this.x * vector.x;
    const y = this.y * vector.y;

    return new Vector2(x, y);
  }

  divide(scalar: number): Vector2 {
    const x = this.x / scalar;
    const y = this.y / scalar;

    return new Vector2(x, y);
  }

  static up(): Vector2 {
    return new Vector2(0, 1);
  }

  static down(): Vector2 {
    return new Vector2(0, -1);
  }

  static left(): Vector2 {
    return new Vector2(-1, 0);
  }

  static right(): Vector2 {
    return new Vector2(1, 0);
  }

  static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static one(): Vector2 {
    return new Vector2(1, 1);
  }

  magnitude(): number {
    return Math.sqrt(this.magnitudeSquared());
  }

  magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  normalize(): Vector2 {
    const length = this.magnitude();

    if (length === 0) return this;

    return this.divide(length);
  }

  floorComponents(): Vector2 {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  toString(): string {
    return `(${this.x.toFixed(1)}, ${this.y.toFixed(1)})`;
  }
}
