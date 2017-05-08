import { Vector4 } from '../math';
import Material from './material';
import vs from '../shaders/basic.vs';
import fs from '../shaders/basic.fs';

const createDefaultAttributes = () => {
  return {};
};

// Create a new instance of the underlying Vector4 data
// so materials can have unique uniforms, or shared if
// supplying its own uniform Vector.
const createDefaultUniforms = () => {
  return {
    color: new Vector4(1, 1, 1, 1),
  }
};

export default class BasicMaterial extends Material {
  constructor(uniforms={}, attributes={}) {
    super(vs,
          fs,
          // TODO lazily create defaults if needed
          Object.assign({}, createDefaultUniforms(), uniforms),
          Object.assign({}, createDefaultAttributes(), attributes)
          );
  }
}
