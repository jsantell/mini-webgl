const ARRAY_BUFFER = 0x8892;
const ELEMENT_ARRAY_BUFFER = 0x8893;

export default class BufferAttribute {
  constructor(array, size, isElementArray) {
    this.array = array;
    this.size = size;
    this.count = array.length / size;
    this.isElementArray = isElementArray;
  }

  getArray() {
    return this.array;
  }

  getCount() {
    return this.count;
  }

  getSize() {
    return this.size;
  }

  getType() {
    return this.isElementArray ? ELEMENT_ARRAY_BUFFER : ARRAY_BUFFER;
  }
}
