import React from 'react';
import styles from './Select.css';

import Loading from '../../common/loading/Loading';

export default class ImagePreview extends React.Component {
  static get propTypes() {
    return {
      fetchSrc: React.PropTypes.string,
      fileSrc: React.PropTypes.object,
      handleSelect: React.PropTypes.func.isRequired,
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
      data: null,
      img: props.fileSrc && URL.createObjectURL(props.fileSrc),
      isFetching: false,
      isLoaded: false,
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
      if (nextProps.fileSrc.type === 'image/gif') {
        this.setState({
          isFetching: false,
          isLoaded: false,
          error: null,
          img: URL.createObjectURL(nextProps.fileSrc),
          data: nextProps.fileSrc,
        });
      } else {
        this.setState({
          isFetching: false,
          isLoaded: false,
          error: 'Not a GIF',
          img: null,
          data: null,
        });
      }
    }
  }

  fetchImage(imgSrc) {
    this.setState({
      isFetching: true,
      isLoaded: false,
      error: null,
    });

    fetch(imgSrc)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res;
      })
      .then(res => res.blob())
      .then((data) => {
        if (data.type !== 'image/gif') {
          throw new Error('Not a GIF');
        }
        if (this.props.fetchSrc === imgSrc) {
          const img = URL.createObjectURL(data);
          this.setState({
            isFetching: false,
            error: null,
            data,
            img,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isFetching: false,
          isLoaded: false,
          img: null,
          data: null,
          error,
        });
      });
  }

  handleImgLoad() {
    this.setState({ isLoaded: true });
  }

  handleImgError(e) {
    this.setState({ error: e.type });
  }

  handleClickNext(e) {
    e.preventDefault();
    this.props.handleSelect(this.state.data);
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
        { !this.state.error && this.state.isLoaded &&
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
