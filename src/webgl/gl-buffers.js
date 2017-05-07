const BUFFERS = Symbol('buffers');

export default class GLBuffers {
  constructor(gl) {
    this.gl = gl;
    this[BUFFERS] = new Map();
  }

  _initBuffer(array, type) {
    const gl = this.gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, array, gl.STATIC_DRAW);
    this[BUFFERS].set(array, buffer);
    return buffer;
  }

  /**
   * @param {BufferAttribute} bufferAttr
   */
  getBuffer(bufferAttr) {
    const array = bufferAttr.getArray();
    let buffer = this[BUFFERS].get(array);
    if (buffer === undefined) {
      buffer = this._initBuffer(array, bufferAttr.getType());
    }
    return buffer;
  }
}
