import React from 'react';
import styles from './Select.css';

import ImagePreview from './ImagePreview';

export default class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchSrc: null,
      fileSrc: null,
    };
  }

  handleChange(e) {
    this.setState({
      fetchSrc: e.target.value,
      fileSrc: null,
    });
  }

  handleSelectFile() {
    const file = this.fileInputEl.files[0];
    this.setState({
      fetchSrc: file.name,
      fileSrc: file,
    });
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
          style={{ width: '100%', maxWidth: '60rem' }}
          placeholder="Paste your link here"
          value={this.state.fetchSrc}
          onChange={e => this.handleChange(e)}
        />
        <input
          type="file"
          accept="image/gif"
          className={styles.button}
          style={{ width: '100%', maxWidth: '60rem' }}
          ref={el => this.registerFileInput(el)}
          onChange={() => this.handleSelectFile()}
          placeholder="Select File"
        />
        <ImagePreview
          fileSrc={this.state.fileSrc}
          fetchSrc={this.state.fetchSrc}
        />
      </div>
    );
  }
}
