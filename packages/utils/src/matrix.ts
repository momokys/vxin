export type RC = [number, number]
export class Matrix {
  private readonly _rc: RC
  private readonly _arr: number[]

  public constructor(rc: RC, arr: number[]) {
    this._rc = rc
    this._arr = arr
    if (this._arr.length !== this._rc[0] * this._rc[1]) {
      throw new Error(`[matrix]: expected arr length ${this._rc[0] * this._rc[1]}, but got ${this._arr.length}`)
    }
  }

  public get(rc: RC) {
    return this._arr[Matrix.index(this, rc)]
  }
  public set(rc: RC, value: number) {
    this._arr[Matrix.index(this, rc)] = value
  }
  public add(m: Matrix) {
    return Matrix.add(this, m)
  }
  public multiply(m: Matrix) {
    return Matrix.multiply(this, m)
  }
  public flatRow() {
    const s: number[] = []
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        s.push(this.get([r, c]))
      }
    }
    return s
  }
  public flatCol() {
    const s: number[] = []
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        s.push(this.get([r, c]))
      }
    }
    return s
  }
  public clone() {
    return new Matrix([this._rc[0], this._rc[1]], [...this._arr])
  }
  public toString() {
    const res: string[] = []
    for (let r = 0, maxR = this._rc[0]; r < maxR; r++) {
      const s: number[] = []
      for (let c = 0, maxC = this._rc[1]; c < maxC; c++) {
        s.push(this.get([r, c]))
      }
      res.push(s.join('\t'))
    }
    return res.join('\n')
  }

  private static index(m: Matrix, rc: RC) {
    if (rc[0] < 0 || rc[0] >= m._rc[0] || rc[1] < 0 || rc[1] >= m._rc[1]) {
      throw new Error(`[matrix]: rc out of [${m._rc[0]}, ${m._rc[1]}]`)
    }
    return rc[0] * m._rc[1] + rc[1]
  }
  public static add(m1: Matrix, m2: Matrix) {
    if (m1._rc[0] !== m2._rc[0] || m1._rc[0] !== m2._rc[0]) {
      throw new Error('[matrix]: 行数或列数不相等，无法进行加法运算')
    }
    const arr: number[] = new Array(m1._arr.length)
    for (let i = 0, len = m1._arr.length; i < len; i++) {
      arr[i] = m1._arr[i] + m2._arr[i]
    }
    return new Matrix([m1._rc[0], m1._rc[1]], arr)
  }
  public static multiply(m1: Matrix, m2: Matrix) {
    if (m1._rc[1] !== m2._rc[0]) {
      throw new Error(`[matrix]: left matrix col(${m1._rc[1]}) not equal right matrix row(${m2._rc[0]})`)
    }
    const m = new Matrix([m1._rc[0], m2._rc[1]], new Array(m1._rc[0] * m2._rc[1]))
    for (let r = 0, maxR = m1._rc[0]; r < maxR; r++) {
      for (let c = 0, maxC = m2._rc[1]; c < maxC; c++) {
        const rc: RC = [r, c]
        m.set(rc, Matrix.rcMultiply(rc, m1, m2))
      }
    }
    return m
  }
  private static rcMultiply(rc: RC, m1: Matrix, m2: Matrix) {
    let res = 0
    const max = m1._rc[1]
    for (let i = 0; i < max; i++) {
      res += m1.get([rc[0], i]) * m2.get([i, rc[1]])
    }
    return res
  }
}
