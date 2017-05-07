import { Matrix4, Vector3 } from './math';
const CHILDREN = Symbol('children');
const MMATRIX = Symbol('mmatrix');
let id = 0;

/**
 * Node is a base class object that can contain children,
 * and have `position`, `rotation`, and `scale` properties.
 */
export default class Node {
  constructor() {
    this.id = ++id;
    this[CHILDREN] = new Set();

    this.position = new Vector3(0, 0, 0);
    this.rotation = new Vector3(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);
    this[MMATRIX] = new Matrix4();
  }

  getMatrix() {
    if (this.position.dirty ||
        this.rotation.dirty ||
        this.scale.dirty) {
      this._updateMatrix();
    }
    return this[MMATRIX];
  }

  _updateMatrix() {
    const matrix = this[MMATRIX];
    matrix.identity();
    matrix.translate(this.position);
    matrix.rotate(this.rotation);
    matrix.scale(this.scale);
    this.position.dirty =
    this.rotation.dirty =
    this.scale.dirty = false;
    return this;
  }

  add(object) {
    // Not yet implementing mapping local space
    // to world space based on ancestry in scene graph
    if (!this.useCamera) {
      throw new Error('not yet implemented');
    }
    this[CHILDREN].add(object);
  }

  remove(object) {
    // Not yet implementing mapping local space
    // to world space based on ancestry in scene graph
    if (!this.useCamera) {
      throw new Error('not yet implemented');
    }
    this[CHILDREN].delete(object);
  }

  getChildren() {
    // Not yet implementing mapping local space
    // to world space based on ancestry in scene graph
    if (!this.useCamera) {
      throw new Error('not yet implemented');
    }
    return this[CHILDREN].values();
  }
}
