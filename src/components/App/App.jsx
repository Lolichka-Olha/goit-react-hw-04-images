import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from '../../services/Api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(null);

  const getSearchName = query => {
    if (query === searchName) {
      toast.info(
        `The search for ${query} has already been performed. Use the "load more" button.`
      );
      return;
    }
    setSearchName(query);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!searchName) {
      return;
    }
    const searchImages = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await getImages(searchName, page);
        const totalPages = Math.ceil(totalHits / 12);

        if (hits.length === 0) {
          toast.error('No images found');
          return;
        }

        if (page > totalPages) {
          toast.info('No more pages');
          return;
        }

        if (page === 1) {
          toast.success(`Found ${totalHits} images of  ${searchName}`);
        }
        setImages(prevImage => [...prevImage, ...hits]);
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    searchImages();
  }, [page, searchName]);

  const openModal = currentUrl => {
    setUrl(currentUrl);
  };

  const closeModal = () => {
    setUrl('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={getSearchName} />
      <ImageGallery
        images={images}
        onImageClick={openModal}
        loadMore={loadMore}
      />

      {url && <Modal currentUrl={url} alt={url} onClose={closeModal} />}

      {images.length >= 12 && !isLoading && <Button onClick={loadMore} />}
      {isLoading && <Loader />}
      <ToastContainer position="top-right" />
    </Container>
  );
};
