import assert from 'assert';
import Register from './register';

export default class Attribute extends Register {
  constructor(gl, program, info) {
    super(gl, program, info);

    this.gl.enableVertexAttribArray(this.loc);
  }

  _getLocation() {
    return this.gl.getAttribLocation(this.program, this.name);
  }

  set(value, size) {
    const { gl, loc, type } = this;

    gl.bindBuffer(gl.ARRAY_BUFFER, value);
    gl.vertexAttribPointer(this.loc, size, gl.FLOAT, false, 0, 0);
    this.value = value;
  }
}
