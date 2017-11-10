import Node from './node';
import { Matrix4 } from './math';
const PMATRIX = Symbol('pmatrix');
const IMATRIX = Symbol('imatrix');

export default class Camera extends Node {
  constructor(fov=45, aspect=1, near=0.01, far=1000) {
    super();
    this[PMATRIX] = new Matrix4();
    this[IMATRIX] = new Matrix4();
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;

    this.updateProjectionMatrix();
  }

  getProjectionMatrix() {
    return this[PMATRIX];
  }

  getInverseWorldMatrix() {
    return Matrix4.invert(this[IMATRIX].identity(), this.getWorldMatrix());
  }

  updateProjectionMatrix() {
    return this[PMATRIX].perspective(this.fov, this.aspect, this.near, this.far);
  }
}
