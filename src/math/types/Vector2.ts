export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public set = (value: Vector2) => {
    this.x = value.x;
    this.y = value.y;
  };

  public add = (value: Vector2): Vector2 => {
    const x = this.x + value.x;
    const y = this.y + value.y;

    return new Vector2(x, y);
  };

  public subtract = (value: Vector2): Vector2 => {
    const x = this.x - value.x;
    const y = this.y - value.y;

    return new Vector2(x, y);
  };

  public multiply = (scalar: number): Vector2 => {
    const x = this.x * scalar;
    const y = this.y * scalar;

    return new Vector2(x, y);
  };

  public multiplyComponents = (vector: Vector2): Vector2 => {
    const x = this.x * vector.x;
    const y = this.y * vector.y;

    return new Vector2(x, y);
  };

  public divide = (scalar: number): Vector2 => {
    const x = this.x / scalar;
    const y = this.y / scalar;

    return new Vector2(x, y);
  };

  static get up(): Vector2 {
    return new Vector2(0, 1);
  }

  static get down(): Vector2 {
    return new Vector2(0, -1);
  }

  static get left(): Vector2 {
    return new Vector2(-1, 0);
  }

  static get right(): Vector2 {
    return new Vector2(1, 0);
  }

  static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static get one(): Vector2 {
    return new Vector2(1, 1);
  }

  public magnitude = (): number => {
    return Math.sqrt(this.magnitudeSquared());
  };

  public magnitudeSquared = (): number => {
    return this.x * this.x + this.y * this.y;
  };

  public normalize = (): Vector2 => {
    const length = this.magnitude();

    if (length === 0) return this;

    return this.divide(length);
  };

  public floorComponents = (): Vector2 => {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  };

  public clone = (): Vector2 => {
    return new Vector2(this.x, this.y);
  };

  public toString = (): string => {
    return `(${this.x.toFixed(1)}, ${this.y.toFixed(1)})`;
  };
}
