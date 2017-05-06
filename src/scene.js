import Node from './node';
import Camera from './camera';
import Renderer from './renderer';

export default class Scene extends Node {
  constructor(canvas) {
    super();
    this.camera = null;
    this.renderer = new Renderer(canvas);
  }

  useCamera(camera) {
    this.camera = camera;
  }

  render() {
    this.renderer.render(this, this.camera);
  }

  setSize(width, height) {
    this.renderer.setSize(width, height);
  }
}
