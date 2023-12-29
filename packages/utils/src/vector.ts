import { Matrix } from './matrix'
import { Transform } from './transform'

export class Vec {
  protected _matrix: Matrix
  constructor(matrix: Matrix) {
    this._matrix = matrix
  }
  add(v: Vec) {
    this._matrix = this._matrix.add(v._matrix).add(new Matrix([4, 1], [0, 0, 0, -1]))
    return this
  }
  transform(t: Transform) {
    this._matrix = t.matrix().multiply(this._matrix)
    return this
  }
  matrix() {
    return this._matrix.clone()
  }
  clone() {
    const Constructor = (this as any).__proto__.constructor
    const ins = new Constructor() as Vec
    ins._matrix = this._matrix.clone()
    return ins as any
  }
  public static add(v1: Vec, v2: Vec) {
    return v1.clone().add(v2)
  }
}

export class Vec2D extends Vec {
  public get x() {
    return this._matrix.get([0, 0])
  }
  public set x(value: number) {
    this._matrix.set([0, 0], value)
  }
  public get y() {
    return this._matrix.get([1, 0])
  }
  public set y(value: number) {
    this._matrix.set([1, 0], value)
  }
  constructor(x = 0, y = 0) {
    super(new Matrix([4, 1], [x, y, 0, 1]))
  }
  public toString() {
    return `(${this.x}, ${this.y})`
  }
  public static add(v1: Vec, v2: Vec): Vec2D {
    return v1.clone().add(v2)
  }
}

export class Vec3D extends Vec2D {
  public get z() {
    return this._matrix.get([2, 0])
  }
  public set z(value: number) {
    this._matrix.set([2, 0], value)
  }
  constructor(x = 0, y = 0, z = 0) {
    super(x, y)
    this.z = z
  }
  public toString() {
    return `(${this.x}, ${this.y}, ${this.z})`
  }
  public static add(v1: Vec, v2: Vec): Vec3D {
    return v1.clone().add(v2)
  }
}
