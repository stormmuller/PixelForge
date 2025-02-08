export class Matrix3x3 {
  private _matrix: number[];

  constructor(matrix: number[]) {
    this._matrix = matrix;
  }

  get matrix(): number[] {
    return this._matrix;
  }

  public translate = (x: number, y: number): Matrix3x3 => {
    this._matrix[6] += this._matrix[0] * x + this._matrix[3] * y;
    this._matrix[7] += this._matrix[1] * x + this._matrix[4] * y;

    return this;
  };

  public rotate = (radians: number): Matrix3x3 => {
    const cosRotation = Math.cos(radians);
    const sinRotation = Math.sin(radians);
    const m0 = this._matrix[0];
    const m1 = this._matrix[1];
    const m3 = this._matrix[3];
    const m4 = this._matrix[4];

    this._matrix[0] = cosRotation * m0 + sinRotation * m3;
    this._matrix[1] = cosRotation * m1 + sinRotation * m4;
    this._matrix[3] = -sinRotation * m0 + cosRotation * m3;
    this._matrix[4] = -sinRotation * m1 + cosRotation * m4;

    return this;
  };

  public scale = (x: number, y: number): Matrix3x3 => {
    this._matrix[0] *= x;
    this._matrix[1] *= x;
    this._matrix[3] *= y;
    this._matrix[4] *= y;

    return this;
  };
}
