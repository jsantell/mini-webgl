import assert from 'assert';
import Uniform from './uniform';
import Attribute from './attribute';

const PROGRAM = Symbol('program');
const VS = Symbol('vs');
const FS = Symbol('fs');

export default class Program {
  /**
   * @param {WebGLRenderingContext} gl
   * @param {String} vertSrc
   * @param {String} fragSrc
   */
  constructor(gl, vertSrc, fragSrc) {
    this.gl = gl;

    this[PROGRAM] = gl.createProgram();

    this.vertSrc = vertSrc;
    this.fragSrc = fragSrc;

    this[VS] = this._createShader(vertSrc, gl.VERTEX_SHADER);
    this[FS] = this._createShader(fragSrc, gl.FRAGMENT_SHADER);

    this._attachAndLink();

    this.attributes = {};
    this.uniforms = {};

    this._initializeAttributes();
    this._initializeUniforms();
  }

  use() {
    this.gl.useProgram(this[PROGRAM]);
  }

  getVertexSource() {
    return this.vertSrc;
  }

  getFragmentSource() {
    return this.fragSrc;
  }

  setUniform(name, value) {
    const uniform = this.uniforms[name];
    uniform.set(value);
  }

  setAttribute(name, value) {
    const attribute = this.attributes[name];
    attribute.set(value);
  }

  _initializeAttributes() {
    const attrCount = this._getParam(this.gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < attrCount; i++) {
      const info = this.gl.getActiveAttrib(this[PROGRAM], i);
      this.attributes[info.name] = new Attribute(this.gl, this[PROGRAM], info);
    }

    // console.log(`Initialized attributes: ${Object.keys(this.attributes)}`);
  }

  _initializeUniforms() {
    const uniformCount = this._getParam(this.gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformCount; i++) {
      const info = this.gl.getActiveUniform(this[PROGRAM], i);
      this.uniforms[info.name] = new Uniform(this.gl, this[PROGRAM], info);
    }

    // console.log(`Initialized uniforms: ${Object.keys(this.uniforms)}`);
  }

  _createShader(src, glType) {
    const shader = this.gl.createShader(glType);
    this.gl.shaderSource(shader, src);

    // TODO compile lazily
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
    }

    return shader;
  }

  _attachAndLink() {
    this.gl.attachShader(this[PROGRAM], this[VS]);
    this.gl.attachShader(this[PROGRAM], this[FS]);
    this.gl.linkProgram(this[PROGRAM]);
    if (!this._getParam(this.gl.LINK_STATUS)) {
      const error = this.gl.getProgramInfoLog(this[PROGRAM]);
      console.error(`Error linking program: ${error}`);
    }
  }

  /**
   * @param {GLenum}
   */
  _getParam(parameter) {
    assert(parameter, 'must provide a parameter');
    return this.gl.getProgramParameter(this[PROGRAM], parameter);
  }

}
