import { Component } from 'react';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from '../../services/Api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchName: '',
    page: 1,
    url: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.setState({ loading: true });
      this.searchImages();

      return;
    }
  }

  getImages = query => {
    this.setState({
      searchName: query,
      page: 1,
      images: [],
    });
  };

  searchImages = async () => {
    const { searchName, page } = this.state;
    this.setState({ isLoading: true });

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
        toast.success(`${totalHits} images found`);
      }
      this.setState(({ images }) => ({ images: [...images, ...hits] }));
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = currentUrl => {
    this.setState({ url: currentUrl });
  };

  closeModal = () => {
    this.setState({
      url: '',
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, isLoading, url } = this.state;
    const { getImages, openModal, closeModal, loadMore } = this;

    return (
      <Container>
        <Searchbar onSubmit={getImages} />
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
  }
}
