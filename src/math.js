import assert from 'assert';
import glMatrix from 'gl-matrix';
const {
  vec2,
  vec3,
  vec4,
  mat2,
  mat3,
  mat4,
} = glMatrix;

const X_SCALAR = [1, 0, 0];
const Y_SCALAR = [0, 1, 0];
const Z_SCALAR = [0, 0, 1];

class Vector {
  constructor(size, x, y, w, z) {
    this.size = size;
    switch (this.size) {
      case 2:
        this.mathBase = vec2;
        break;
      case 3:
        this.mathBase = vec3;
        break;
      case 4:
        this.mathBase = vec4;
        break;
      default:
        throw new Error('unknown size');
    }
    this.data = this.mathBase.create();
    this.set(x, y, w, z);
    this.dirty = true;
    this.isVector = true;
  }

  getArray() {
    return this.data;
  }

  identity() {
    this.mathBase.identity(this.data);
    return this;
  }

  set(x, y, z, w) {
    if (x !== undefined) this._setIndex(0, x);
    if (y !== undefined) this._setIndex(1, y);
    if (z !== undefined) this._setIndex(2, z);
    if (w !== undefined) this._setIndex(3, w);
  }

  getX() { return this._getIndex(0); }
  getY() { return this._getIndex(1); }
  getZ() { return this._getIndex(2); }
  getW() { return this._getIndex(3); }

  setX(v) { return this._setIndex(0, v); }
  setY(v) { return this._setIndex(1, v); }
  setZ(v) { return this._setIndex(2, v); }
  setW(v) { return this._setIndex(3, v); }

  _getIndex(i) {
    assert(this.size > i);
    return this.data[i];
  }

  _setIndex(i, value) {
    assert(this.size > i);
    this.data[i] = value;
    this.dirty = true;
  }
}

export class Vector2 extends Vector {
  constructor(x, y) {
    super(2, x, y);
  }
}

export class Vector3 extends Vector {
  constructor(x, y, z) {
    super(3, x, y, z);
  }
}

export class Vector4 extends Vector {
  constructor(x, y, z, w) {
    super(4, x, y, z, w);
  }
}

export class Matrix {
  constructor(size) {
    this.size = size;
    switch (this.size) {
      case 2:
        this.mathBase = mat2;
        break;
      case 3:
        this.mathBase = mat3;
        break;
      case 4:
        this.mathBase = mat4
        break;
      default:
        throw new Error('unknown size');
    }

    this.data = this.mathBase.create();
    this.isMatrix = true;
  }

  getArray() {
    return this.data;
  }

  identity() {
    this.mathBase.identity(this.data);
    return this;
  }

  translate(vec3) {
    this.mathBase.translate(this.data, this.data, vec3.getArray());
  }

  rotate(vec3) {
    const rArray = vec3.getArray();
    this.mathBase.rotate(this.data, this.data, rArray[0], X_SCALAR);
    this.mathBase.rotate(this.data, this.data, rArray[1], Y_SCALAR);
    this.mathBase.rotate(this.data, this.data, rArray[2], Z_SCALAR);
  }

  scale(vec3) {
    this.mathBase.scale(this.data, this.data, vec3.getArray());
  }
}

export class Matrix2 extends Matrix {
  constructor() {
    super(2);
  }
}

export class Matrix3 extends Matrix {
  constructor() {
    super(3);
  }
}

export class Matrix4 extends Matrix {
  constructor() {
    super(4);
  }

  static multiply(out, a, b) {
    mat4.multiply(out.getArray(), a.getArray(), b.getArray());
    return out;
  }

  perspective(fov, aspect, near, far) {
    mat4.perspective(this.data, fov, aspect, near, far);
    return this;
  }
}
