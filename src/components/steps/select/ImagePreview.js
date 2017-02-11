import React from 'react';
import styles from './Select.css';

import Loading from '../../common/loading/Loading';

export default class ImagePreview extends React.Component {
  static get propTypes() {
    return {
      fetchSrc: React.PropTypes.string,
      fileSrc: React.PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      fetchSrc: null,
      fileSrc: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      img: props.fileSrc && URL.createObjectURL(props.fileSrc),
      isFetching: false,
      error: null,
    };
  }

  componentDidMount() {
    if (this.props.fetchSrc && !this.props.fileSrc) {
      this.fetchImage(this.props.fetchSrc);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchSrc && !nextProps.fileSrc) {
      this.fetchImage(nextProps.fetchSrc);
    } else if (nextProps.fileSrc) {
      this.setState({
        isFetching: false,
        error: null,
        img: URL.createObjectURL(nextProps.fileSrc),
      });
    }
  }

  fetchImage(imgSrc) {
    this.setState({
      isFetching: true,
      error: null,
    });

    // fetch(imgSrc, { mode: 'no-cors' })
    fetch(imgSrc)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res;
      })
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
      .then((img) => {
        if (this.props.fetchSrc === imgSrc) {
          this.setState({
            isFetching: false,
            error: null,
            img,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isFetching: false,
          img: null,
          error,
        });
      });
  }

  handleImgLoad(e) {
  }

  handleImgError(e) {
    this.setState({ error: e.type });
  }

  handleClickNext(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className={styles.imagePreview}>
        { this.state.isFetching ? <Loading /> : null }
        { this.state.error ? JSON.stringify(this.state.error, ['message']) : null }
        { !this.state.error &&
          <img
            src={this.state.img}
            alt=""
            onLoad={e => this.handleImgLoad(e)}
            onError={e => this.handleImgError(e)}
          />
        }
        { !this.state.error &&
          <button
            className={styles.nextButton}
            onClick={e => this.handleClickNext(e)}
          >
            Next Step &gt;
          </button>
        }
      </div>
    );
  }
}
