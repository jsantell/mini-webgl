const BUFFERS = Symbol('buffers');

export default class GLBuffers {
  constructor(gl) {
    this.gl = gl;
    this[BUFFERS] = new Map();
  }

  _initBuffer(array) {
    const gl = this.gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    this[BUFFERS].set(array, buffer);
    return buffer;
  }

  getBuffer(array) {
    let buffer = this[BUFFERS].get(array);
    if (buffer === undefined) {
      buffer = this._initBuffer(array);
    }
    return buffer;
  }
}
