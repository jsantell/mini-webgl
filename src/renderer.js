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
    const vMatrix = camera.getWorldMatrix();

    // Clear out the canvas
    gl.clear();

    const queue = [scene];

    while (queue.length) {
      const node = queue.shift();

      // Get and construct our model and model view matrices
      const mMatrix = node.getWorldMatrix();
      let mvMatrix = this._mvMatrix;
      Matrix4.multiply(mvMatrix.identity(), vMatrix, mMatrix);

      // If we have a model, pass it to the GLWrapper
      // to draw
      if (node.isModel) {
        this.gl.draw(node.geometry, node.material, mMatrix, mvMatrix, pMatrix, vMatrix);
      }

      // If this node has children, push them into the queue
      if (node.hasChildren()) {
        const children = node.getChildren();
        for (let child of children) {
          queue.push(child);
        }
      }
    }
  }
}
