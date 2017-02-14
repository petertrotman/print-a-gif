import React from 'react';
import { GifReader, GifWriter } from 'omggif';

import Loading from '../../common/loading/Loading';
import styles from './Process.css';

function gifColourPalette(buf) {
  const numColours = 1 << ((buf[0xA] & 0x7) + 1);  // eslint-disable-line no-bitwise

  return buf
    .slice(0xD, 0xD + (numColours * 3))
    .reduce((acc, _, i, arr) => {
      if (i % 3 !== 0) return acc;
      return acc.concat([arr.slice(i / 3, (i / 3) + 3)]);
    }, [])  // [1, 2, 3, 4, 5, 6] -> [[1, 2, 3], [4, 5, 6]]
    .map(rgb => (rgb[0] << 16) | (rgb[1] << 8) | rgb[2]);  // eslint-disable-line no-bitwise
}


export default class Process extends React.Component {
  static get propTypes() {
    return {
      data: React.PropTypes.any.isRequired,
    };
  }

  constructor() {
    super();
    this.state = {
      fileReader: null,
      gifData: null,
      processedGifData: null,
      processedGif: null,
      gifReader: null,
      gifWriter: null,
      numFrames: 1,
      isRendering: false,
    };
  }

  componentDidMount() {
    this.readData(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.readData(nextProps.data);
  }

  readData(data) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const gifData = new Uint8Array(fileReader.result);
      const gifReader = new GifReader(gifData);
      const numFrames = gifReader.numFrames();
      this.setState({ gifData, gifReader, frames, numFrames });
    };

    this.setState({
      fileReader,
      gifData: null,
      processedGifData: null,
      processedGif: null,
      gifReader: null,
      gifWriter: null,
      isRendering: false,
      numFrames: 1,
    });

    fileReader.readAsArrayBuffer(data);
  }

  handleValueChange(e) {
    e.preventDefault();
    this.setState({ numFrames: e.target.value });
  }

  handleOk(e) {
    e.preventDefault();
    this.setState({
      isRendering: true,
      processedGifData: null,
      processedGif: null,
    }, () => this.renderGif());
  }

  renderGif() {
    const buf = new Uint8Array(this.state.gifData.length);
    const palette = gifColourPalette(this.state.gifData);
    const { width, height } = this.state.gifReader;

    const writer = new GifWriter(buf, width, height, { loop: 0, palette });
    const pixels = new Uint8Array(width * height);

    for (let i = 0; i < this.state.numFrames; i += 1) {
      // Reset pixels
      for (let j = 0; j < pixels.length; j += 1) {
        pixels[j] = 0;
      }

      // To ensure we get [first frame, ...[numFrames-2 frames], last frame]
      const frame =
        Math.floor(i * ((this.state.gifReader.numFrames() - 1) / (this.state.numFrames - 1)));

      const {
        x,
        y,
        width: w,
        height: h,
        delay,
        ...frameOpts
      } = this.state.gifReader.frameInfo(frame);

      const opts = {
        ...frameOpts,
        disposal: 0,
        delay: Math.floor(delay * (this.state.gifReader.numFrames() / this.state.numFrames)),
      };

      this.state.gifReader.decodeAndBlitFrameBGRA(frame, pixels);
      writer.addFrame(x, y, w, h, pixels, opts);
    }

    const processedGifData = buf.slice(0, writer.end());
    const processedGif = URL.createObjectURL(new Blob([processedGifData], { type: 'image/gif' }));

    this.setState({
      isRendering: false,
      gifWriter: writer,
      processedGifData,
      processedGif,
    });
  }

  render() {
    if (!this.state.gifData) {
      return <h4>Processing...</h4>;
    }

    return (
      <div className={styles.process}>
        <h2>Process</h2>
        <div className={styles.numFramesDiv}>
          <label
            htmlFor="numFrames"
            className={styles.numFramesLabel}
          >Number of GIF frames</label>
          <div className={styles.numFramesInputDiv}>
            <input
              id="numFrames"
              className={styles.numFramesInput}
              type="range"
              min="2"
              max={this.state.gifReader.numFrames()}
              value={this.state.numFrames}
              onChange={e => this.handleValueChange(e)}
              disabled={this.state.isRendering}
            />
            <span className={styles.numFramesSpan}>{ this.state.numFrames }</span>
          </div>
          <button
            className={styles.button}
            onClick={e => this.handleOk(e)}
            disabled={this.state.isRendering}
          >Ok</button>
        </div>
        { this.state.isRendering && <Loading /> }
        { this.state.processedGif &&
          <div className={styles.previewDiv}>
            <img
              src={this.state.processedGif}
              alt=""
              onError={e => { e.persist(); console.error(e); }}
            />
          </div>
        }
      </div>
    );
  }
}
