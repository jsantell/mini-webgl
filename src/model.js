import Node from './node';

export default class Model extends Node {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;
    this.isModel = true;
  }
}
