import vertShaderBase from '../shaders/base.vs';
import fragShaderBase from '../shaders/base.fs';

export const standardUniforms = Object.freeze({
  viewMatrix:       { type: '4fv' },

  modelMatrix:      { type: '4fv' },
  modelViewMatrix:  { type: '4fv' },
  projectionMatrix: { type: '4fv' },
});

export const standardAttribs = Object.freeze({
  position: { type: '3f' },
});

export default class Material {
  constructor(vertSrc, fragSrc, uniforms={}, attributes={}) {
    this.uniforms = Object.assign({}, uniforms);
    this.attributes = Object.assign({}, attributes);
    this.vertSrc = vertSrc;
    this.fragSrc = fragSrc;
    this.fullVertSrc = `${vertShaderBase}\n${this.vertSrc}`
    this.fullFragSrc = `${fragShaderBase}\n${this.fragSrc}`
  }

  getFragmentSource() {
    return this.fullFragSrc;
  }

  getVertexSource() {
    return this.fullVertSrc;
  }
}
