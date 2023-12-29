import { Matrix } from './matrix'
import { Vec } from './vector'

export class Transform {
  protected _matrix: Matrix
  public constructor() {
    this._matrix = new Matrix([4, 4], [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ])
  }
  public matrix() {
    return this._matrix.clone()
  }
  public combine(t1: Transform) {
    const t = new Transform()
    t._matrix = this._matrix.multiply(t1._matrix)
    return t
  }
  public translate(tx = 0, ty = 0, tz = 0) {
    this._matrix = new Matrix([4, 4], [
      1, 0, 0, tx,
      0, 1, 0, ty,
      0, 0, 1, tz,
      0, 0, 0, 1,
    ]).multiply(this._matrix)
    return this
  }
  public translateX(t = 0) {
    this.translate(t)
  }
  public translateY(t = 0) {
    this.translate(0, t)
  }
  public translateZ(t = 0) {
    this.translate(0, 0, t)
  }
  public scale(sx = 1, sy = 1, sz = 1) {
    this._matrix = new Matrix([4, 4], [
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1,
    ]).multiply(this._matrix)
    return this
  }
  public scaleX(s = 1) {
    this.scale(s)
  }
  public scaleY(s = 1) {
    this.scale(1, s)
  }
  public scaleZ(s = 1) {
    this.scale(1, 1, s)
  }
  public rotateX(rad: number) {
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    this._matrix = new Matrix([4, 4], [
      1, 0, 0, 0,
      0, cos, -sin, 0,
      0, sin, cos, 0,
      0, 0, 0, 1,
    ]).multiply(this._matrix)
    return this
  }
  public rotateY(rad: number) {
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    this._matrix = new Matrix([4, 4], [
      cos, 0, sin, 0,
      0, 1, 0, 0,
      -sin, 0, cos, 0,
      0, 0, 0, 1,
    ]).multiply(this._matrix)
    return this
  }
  public rotateZ(rad: number) {
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    console.log(cos, sin)
    this._matrix = new Matrix([4, 4], [
      cos, -sin, 0, 0,
      sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]).multiply(this._matrix)
    return this
  }
  public apply(v: Vec) {
    return v.clone().transform(this)
  }
  public css() {
    return `matrix3d(${this._matrix.flatCol().join(', ')})`
  }
  public toString() {
    return this._matrix.toString()
  }

  public static combine(t1: Transform, t2: Transform) {
    return t1.combine(t2)
  }
  public static translate(tx = 0, ty = 0, tz = 0) {
    return new Transform().translate(tx, ty, tz)
  }
  public static translateX(t = 0) {
    return new Transform().translateX(t)
  }
  public static translateY(t = 0) {
    return new Transform().translateY(t)
  }
  public static translateZ(t = 0) {
    return new Transform().translateZ(t)
  }
  public static scale(sx = 1, sy = 1, sz = 1) {
    return new Transform().scale(sx, sy, sz)
  }
  public static scaleX(s = 1) {
    return new Transform().scaleX(s)
  }
  public static scaleY(s = 1) {
    return new Transform().scaleY(s)
  }
  public static scaleZ(s = 1) {
    return new Transform().scaleZ(s)
  }
  public static rotateX(rad: number) {
    return new Transform().rotateX(rad)
  }
  public static rotateY(rad: number) {
    return new Transform().rotateY(rad)
  }
  public static rotateZ(rad: number) {
    return new Transform().rotateZ(rad)
  }
}
