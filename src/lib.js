import { decode } from 'base64-arraybuffer';

export default class PrintAGif {
  contructor(data) {
    this.original = data;
    this.length = this.length.bind(this);
  }

  get length() {
    console.log(this);
    return this.original && this.original.byteLength;
  }
}
