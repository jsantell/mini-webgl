import assert from 'assert';
import Program from './program';

const PROGRAMS = Symbol('programs');

export default class Programs {
  /**
   * @param {WebGLRenderingContext} gl
   */
  constructor(gl) {
    this.gl = gl;
    this[PROGRAMS] = new Map();
  }

  /**
   * @param {Material} material
   * @return {Program}
   */
  getProgram(material) {

    // Get the program from the cache if we've seen this
    // material before
    if (this[PROGRAMS].has(material)) {
      return this[PROGRAMS].get(material);
    }

    const vertSrc = material.getVertexSource();
    const fragSrc = material.getFragmentSource();

    // Otherwise, check to see if the frag and vert shaders
    // are the same as another program already in the cache;
    // this can occur when we use default materials,
    // creating new instances so each instance has its own
    // uniforms, but still should use the same underlying program/shaders.
    for (let program of this[PROGRAMS].values()) {
      if (program.getVertexSource() === vertSrc &&
          program.getFragmentSource() === fragSrc) {
        this[PROGRAMS].set(material, program);
        return program;
      }
    }

    const program = new Program(this.gl, vertSrc, fragSrc);
    this[PROGRAMS].set(material, program);
    return program;
  }
}
