import Program from './program';
import GLBuffers from './gl-buffers';

export default class GLWrapper {
  constructor(gl, width, height) {
    this.gl = gl;
    this.buffers = new GLBuffers(gl);
    this.programs = new Map();
    this.width = width;
    this.height = height;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  clear() {
    const { gl } = this;

    gl.clearColor(0.2, 0.2, 0.2, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, this.width, this.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  /**
   * @param {Geometry} geometry
   * @param {Material} material
   * @param {Matrix4} mMatrix
   * @param {Matrix4} mvMatrix
   * @param {Matrix4} pMatrix
   * @param {Matrix4} vMatrix
   */
  draw(geometry, material, mMatrix, mvMatrix, pMatrix, vMatrix) {
    const gl = this.gl;
    const geoVertexBuffer = this.buffers.getBuffer(geometry.vertices);
    let geoIndicesBuffer;
    if (geometry.indices) {
      geoIndicesBuffer = this.buffers.getBuffer(geometry.indices);
    }

    // Get the Program abstraction associated with this material,
    // or create one, which handles the compiling/linking of
    // shaders and setting up of uniforms
    let program = this.programs.get(material);
    if (!program) {
      program = new Program(this.gl, this.buffers, material.getVertexSource(), material.getFragmentSource());
      this.programs.set(material, program);
    }

    // Start using this program for all future calls
    program.use();

    for (let uniformName of Object.keys(program.uniforms)) {
      const uniform = program.uniforms[uniformName];

      // If this uniform is one of the standard uniforms,
      // set it; otherwise, it's probably user-driven
      switch (uniform.name) {
        case 'modelMatrix':
          uniform.set(mMatrix);
          break;
        case 'modelViewMatrix':
          uniform.set(mvMatrix);
          break;
        case 'projectionMatrix':
          uniform.set(pMatrix);
          break;
        case 'viewMatrix':
          uniform.set(vMatrix);
          break;
        default:
          const value = material.uniforms[uniform.name];
          uniform.set(value);
          break;
      }
    }

    for (let attribName of Object.keys(program.attributes)) {
      const attribute = program.attributes[attribName];

      // If this attribute is one of the standard attributes,
      // set it; otherwise, it's probably user-driven
      switch (attribute.name) {
        case 'position':
          attribute.set(geoVertexBuffer, geometry.vertices.getSize());
          break;
        default:
          const bufferAttr = material.attributes[attribute.name];
          const buffer = this.buffers.getBuffer(bufferAttr);
          attribute.set(buffer, bufferAttr.getSize());
          break;
      }
    }

    if (geoIndicesBuffer) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, geoIndicesBuffer);
      this.gl.drawElements(this.gl.TRIANGLES, geometry.indices.getCount(), gl.UNSIGNED_SHORT, 0);
    } else {
      this.gl.drawArrays(this.gl.TRIANGLES, 0, geometry.vertices.getCount());
    }
  }
}
