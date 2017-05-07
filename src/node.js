import assert from 'assert';
import { Matrix4, Vector3 } from './math';
const CHILDREN = Symbol('children');
const LMATRIX = Symbol('lmatrix');
const WMATRIX = Symbol('wmatrix');
const PARENT = Symbol('parent');
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
    this[LMATRIX] = new Matrix4();
    this[WMATRIX] = new Matrix4();
    this[PARENT] = null;
  }

  /**
   * Get the model matrix of this node in world coordinates.
   * If this node has no parent in the scene graph, then the
   * world matrix is the same as the local matrix.
   */
  getWorldMatrix() {
    if (this[PARENT] === null) {
      return this.getLocalMatrix();
    }

    Matrix4.multiply(this[WMATRIX].identity(),
                     this[PARENT].getWorldMatrix(),
                     this.getLocalMatrix()
                     );

    return this[WMATRIX];
  }

  getLocalMatrix() {
    if (this.position.dirty ||
        this.rotation.dirty ||
        this.scale.dirty) {
      this._updateLocalMatrix();
    }
    return this[LMATRIX];
  }

  _updateLocalMatrix() {
    const matrix = this[LMATRIX];
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
    assert(object instanceof Node, 'Only Nodes may be added to scene graph');
    object[PARENT] = this;
    this[CHILDREN].add(object);
  }

  remove(object) {
    assert(object instanceof Node, 'Only Nodes may be removed from the scene graph');
    object[PARENT] = null;
    this[CHILDREN].delete(object);
  }

  getChildren() {
    return this[CHILDREN].values();
  }

  hasChildren() {
    return this[CHILDREN].size !== 0;
  }
}
