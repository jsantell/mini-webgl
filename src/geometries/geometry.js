import assert from 'assert';

export default class Geometry {
  constructor(vertices, size, count) {
    this.vertices = vertices;
    this.count = count;
    this.size = size;
    assert(vertices.length === (count * size));
  }
}
