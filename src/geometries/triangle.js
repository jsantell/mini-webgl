import Geometry from './geometry';
import BufferAttribute from '../buffer-attribute';

export default class Triangle extends Geometry {
  constructor() {
    const vertices = new BufferAttribute(new Float32Array([
       0,  1, 0,
      -1, -1, 0,
       1, -1, 0
    ]), 3);

    super(vertices);
  }
}
