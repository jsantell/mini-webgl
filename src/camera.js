import Node from './node';
import glMatrix from 'gl-matrix';
const { mat4 } = glMatrix;
const PMATRIX = Symbol('pmatrix');

export default class Camera extends Node {
  constructor(fov=45, aspect=1, near=0.01, far=20000) {
    super();
    this[PMATRIX] = mat4.create();
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;

    this.updateProjectionMatrix();
  }

  getPerspectiveMatrix() {
    return this[PMATRIX];
  }

  updateProjectionMatrix() {
    mat4.perspective(this[PMATRIX], this.fov, this.aspect, this.near, this.far);
    return this[PMATRIX];
  }
}
