import glMatrix from 'gl-matrix';
const { mat4, quat, vec3 } = glMatrix;
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

    this.position = vec3.create();
    // Get vec3 form working before quat
    // this.rotation = quat.create();
    this.rotation = vec3.create();
    this.scale = vec3.set(vec3.create(), 1, 1, 1);
    this[MMATRIX] = mat4.create();
    this.updateMatrix();
  }

  updateMatrix() {
    mat4.identity(this[MMATRIX]);
    mat4.translate(this[MMATRIX], this[MMATRIX], this.position);
    mat4.rotate(this[MMATRIX], this[MMATRIX], this.rotation[0], [1, 0, 0]);
    mat4.rotate(this[MMATRIX], this[MMATRIX], this.rotation[1], [0, 1, 0]);
    mat4.rotate(this[MMATRIX], this[MMATRIX], this.rotation[2], [0, 0, 1]);
    mat4.scale(this[MMATRIX], this[MMATRIX], this.scale);

    // Had trouble getting the below working with quaternions
    // :( :( :(
    /*
    mat4.fromRotationTranslationScale(this[MMATRIX],
                                      this.rotation,
                                      this.position,
                                      this.scale);
    */
  }

  getMatrix() {
    return this[MMATRIX];
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
