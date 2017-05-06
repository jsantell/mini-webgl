import assert from 'assert';
import Register from './register';

export default class Uniform extends Register {
  constructor(gl, program, info) {
    super(gl, program, info);
  }

  _getLocation() {
    return this.gl.getUniformLocation(this.program, this.name);
  }

  set(value) {
    const { gl, loc, type } = this;

    switch (type) {
      case gl.INT:
        gl.uniform1i(loc, value);
        break;
      case gl.INT_VEC2:
        gl.uniform2iv(loc, value);
        break;
      case gl.INT_VEC3:
        gl.uniform3iv(loc, value);
        break;
      case gl.INT_VEC4:
        gl.uniform4iv(loc, value);
        break;
      case gl.FLOAT:
        gl.uniform1f(loc, value);
        break;
      case gl.FLOAT_VEC2:
        gl.uniform2fv(loc, value);
        break;
      case gl.FLOAT_VEC3:
        gl.uniform3fv(loc, value);
        break;
      case gl.FLOAT_VEC4:
        gl.uniform4fv(loc, value);
        break;
      case gl.FLOAT_MAT3:
        gl.uniformMatrix3fv(loc, false, value);
        break;
      case gl.FLOAT_MAT4:
        gl.uniformMatrix4fv(loc, false, value);
        break;
      default:
        throw new Error('Unexpected uniform type');
    }

    this.value = value;
  }
}
