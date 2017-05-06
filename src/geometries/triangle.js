import Geometry from './geometry';

export default class Triangle extends Geometry {
  constructor() {
    super(new Float32Array([
     0,  1, 0,
    -1, -1, 0,
     1, -1, 0
    ]),
    3,
    3);
  }
}
