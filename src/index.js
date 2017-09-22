import { decode } from 'base64-arraybuffer';

export default class PrintAGif {
  contructor(data) {
    const original = decode(data);
    this.gif = {
      original,
    };
  }
}
