import Node from './node';

export default class Model extends Node {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;
  }

  add(object) {
    // Not yet implementing mapping local space
    // to world space based on ancestry in scene graph
    if (!object instanceof Scene) {
      throw new Error('not yet implemented');
    }
    this[CHILDREN].add(object);
  }

  remove(object) {
    // Not yet implementing mapping local space
    // to world space based on ancestry in scene graph
    if (!object instanceof Scene) {
      throw new Error('not yet implemented');
    }
    this[CHILDREN].delete(object);
  }

  getChildren() {
    // Not yet implementing mapping local space
    // to world space based on ancestry in scene graph
    if (!object instanceof Scene) {
      throw new Error('not yet implemented');
    }
    return this[CHILDREN].values();
  }
}
