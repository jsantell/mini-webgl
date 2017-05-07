import { Vector4 } from '../math';
import Material from './material';
import vs from '../shaders/basic.vs';
import fs from '../shaders/basic.fs';

const DEFAULT_ATTRIBS = {
};

const DEFAULT_UNIFORMS = {
  color: new Vector4(0, 1, 0, 1),
};

export default class BasicMaterial extends Material {
  constructor(uniforms={}, attributes={}) {
    super(vs,
          fs,
          Object.assign({}, DEFAULT_UNIFORMS, uniforms),
          Object.assign({}, DEFAULT_ATTRIBS, attributes)
          );
  }
}
