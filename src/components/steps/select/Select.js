import React from 'react';
import styles from './Select.css';

import ImagePreview from './ImagePreview';

export default class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      gifSrc: '',
      gifFileSrc: null,
    };
  }

  handleChange(e) {
    this.setState({
      gifSrc: e.target.value,
      gifFileSrc: null,
    });
  }

  handleOk() {
    console.log(this.state);
  }

  handleSelectFile() {
    const file = this.fileInputEl.files[0];
    this.setState({
      gifSrc: file.name,
      gifFileSrc: URL.createObjectURL(file),
    }, () => this.handleOk());
  }

  registerFileInput(el) {
    this.fileInputEl = el;
  }

  render() {
    return (
      <div className={styles.select}>
        <h2>Select</h2>
        <p>Paste a link to your GIF below, or select from a file on your computer.</p>
        <input
          type="text"
          placeholder="Paste your link here"
          value={this.state.gifSrc}
          onChange={e => this.handleChange(e)}
        />
        <div className={styles.buttonsDiv}>
          <button
            className={styles.button}
            onClick={() => this.handleOk()}
          >
            Ok
          </button>
          <input
            type="file"
            accept="image/gif"
            className={styles.button}
            ref={el => this.registerFileInput(el)}
            onChange={() => this.handleSelectFile()}
            placeholder="Select File"
          />
        </div>
        <ImagePreview src={this.state.gifFileSrc || this.state.gifSrc} />
      </div>
    );
  }
}
