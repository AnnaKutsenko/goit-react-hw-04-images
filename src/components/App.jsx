import { Component } from 'react';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchImages } from '../api';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [], 
    page: 1,
    isLoading: false,
    error: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
      this.fetchPicture();
    }
  };

  fetchPicture = async () => {
    try {
      this.setState({ isLoading: true });
        const { hits, totalHits } = await fetchImages(
          this.state.query.slice(14),
          this.state.page
        );
      if (!hits.length) {
        return toast.error(`We didn't find anything. Try again`);
      } else {
        toast.success(`We find ${totalHits} pictures`);
      }
      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
        totalHits: totalHits,
      }));
    } catch (error) {
        this.setState({ error: true });
        toast.error(`OOPS! THERE WAS AN ERROR!`)
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSumbit = value => {
    this.setState({
      query: `${Date.now()}/${value}`,
      images: [],
      page: 1,
    });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }
  
  render() {
    const { images, isLoading, error, totalHits } = this.state;
    const lastPage = Math.ceil(totalHits / images.length);

    return (
      <>
        <Searchbar onSubmit={this.handleSumbit} />
        <div>
          {isLoading && <Loader />}
          {error && !isLoading && toast.error('OOPS! Something went wrong, please try reloading the page', { duration: 3000, })}
            <ImageGallery images={images} />
            {images.length > 0 && lastPage > 1 && !isLoading && (
              <Button onLoadMore={this.handleLoadMore} />
          )}
        </div>
        <Toaster position="top-right" />
      </>
    );
  } 
}
