import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, tags, webformatURL, openModal }) => {
  return (
    <GalleryItem>
      <GalleryImage src={webformatURL} alt={tags} id={id} onClick={openModal} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string,
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
