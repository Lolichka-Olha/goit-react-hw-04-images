import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBody, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ tags, onClose, currentUrl }) => {
  useEffect(() => {
    const onKeyDownClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDownClick);

    return () => {
      window.removeEventListener('keydown', onKeyDownClick);
    };
  }, [onClose]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <ModalBody onClick={onClose}>
        <Image src={currentUrl} alt={tags} />
      </ModalBody>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  currentUrl: PropTypes.string,
  tags: PropTypes.string,
};
