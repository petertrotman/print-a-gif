import React from 'react';
import styles from './Select.css';

const ImagePreview = (props) => {
  const src = props.src;
  if (!src || !src.length) return null;
  return (
    <div className={styles.imagePreview}>
      <h3>Preview:</h3>
      <img src={props.src} alt="" />
    </div>
  );
};

ImagePreview.propTypes = {
  src: React.PropTypes.string,
};

ImagePreview.defaultProps = {
  src: null,
};

export default ImagePreview;
