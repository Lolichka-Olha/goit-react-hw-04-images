import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBody, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    tags: PropTypes.string,
    onClose: PropTypes.func,
    currentUrl: PropTypes.string,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDownClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDownClick);
  }

  onKeyDownClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { tags, onClose, currentUrl } = this.props;
    const { onOverlayClick } = this;

    return createPortal(
      <Overlay onClick={onOverlayClick}>
        <ModalBody onClick={onClose}>
          <Image src={currentUrl} alt={tags} />
        </ModalBody>
      </Overlay>,
      modalRoot
    );
  }
}
