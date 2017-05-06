import assert from 'assert';
const TYPES = {
  0x8B50: 'FLOAT_VEC2',
  0x8B51: 'FLOAT_VEC3',
  0x8B52: 'FLOAT_VEC4',
  0x8B53: 'INT_VEC2',
  0x8B54: 'INT_VEC3',
  0x8B55: 'INT_VEC4',
  0x8B56: 'BOOL',
  0x8B57: 'BOOL_VEC2',
  0x8B58: 'BOOL_VEC3',
  0x8B59: 'BOOL_VEC4',
  0x8B5A: 'FLOAT_MAT2',
  0x8B5B: 'FLOAT_MAT3',
  0x8B5C: 'FLOAT_MAT4',
  0x8B5E: 'SAMPLER_2D',
  0x8B60: 'SAMPLER_CUBE',
  0x1400: 'BYTE',
  0x1401: 'UNSIGNED_BYTE',
  0x1402: 'SHORT',
  0x1403: 'UNSIGNED_SHORT',
  0x1404: 'INT',
  0x1405: 'UNSIGNED_INT',
  0x1406: 'FLOAT'
};

export default class Register {
  constructor(gl, program, info) {
    assert(typeof info.name === 'string', 'name must be a string');
    assert(typeof info.size === 'number', 'size must be a number');
    assert(typeof info.type === 'number', 'type must be a number');
    this.gl = gl;
    this.program = program;
    this.name = info.name;
    this.size = info.size;
    this.type = info.type;
    this.value = null;
    this.loc = this._getLocation();
  }

  _getLocation() {
    throw new Error('must be implemented by inheriting class');
  }
}
