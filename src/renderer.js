import { Matrix4 } from './math';
import GLWrapper from './webgl';

export default class Renderer {
  constructor(canvas) {
    let ctx = this.ctx = canvas.getContext('webgl');

    // Use debugging utils if included
    // https://www.khronos.org/webgl/wiki/Debugging
    if (false && window.WebGLDebugUtils) {
      ctx = WebGLDebugUtils.makeDebugContext(
        ctx,
        undefined,
        (funcName, args) => {
          // Log on any undefined args
          let valid = true;
          for (let i = 0; i < args.length; i++) {
            if (args[i] === undefined) {
              valid = false;
            }
          }
          if (!valid) {
            console.error(`Undefined argument in ${funcName}: ${args}`);
          }
        }
      );
    }

    this.gl = new GLWrapper(ctx);
    this.gl.setSize(canvas.width, canvas.height);

    // Temp matrices during render
    this._mvMatrix = new Matrix4();
    this._mMatrix = new Matrix4();
  }

  getContext() {
    return this.ctx;
  }

  setSize(width, height) {
    this.gl.setSize(width, height);
  }

  render(scene, camera) {
    const { gl } = this;
    const pMatrix = camera.getPerspectiveMatrix();
    const vMatrix = camera.getMatrix();

    // Clear out the canvas
    gl.clear();

    for (const node of scene.getChildren()) {
      const mMatrix = node.getMatrix();

      let mvMatrix = this._mvMatrix;
      Matrix4.multiply(mvMatrix.identity(), vMatrix, mMatrix);

      this.gl.draw(node.geometry, node.material, mMatrix, mvMatrix, pMatrix, vMatrix);
    }
  }
}
