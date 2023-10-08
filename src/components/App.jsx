import { useState, useEffect} from 'react';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchImages } from '../api';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const lastPage = Math.ceil(totalHits / images.length);

  useEffect(() => {
    if (!query || !page) {
      return
    }

    const fetchPicture = async () => {
      try {
        setIsloading(true);
          const { hits, totalHits } = await fetchImages(
            query.slice(14),
            page
          );
        if (!hits.length) {
          return toast.error(`We didn't find anything. Try again`);
        } else {
          toast.success(`We find ${totalHits} pictures`);
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(true);
        toast.error(`OOPS! THERE WAS AN ERROR!`)
      } finally {
        setIsloading(false);
      };
    }

    fetchPicture();
  }, [query, page]);


  const handleSumbit = value => {
    setQuery(`${Date.now()}/${value}`);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  }

  return (
    <>
      <Searchbar onSubmit={handleSumbit} />
      <div>
        {isLoading && <Loader />}
        {error && !isLoading && toast.error('OOPS! Something went wrong, please try reloading the page', { duration: 3000, })}
          <ImageGallery images={images} />
          {images.length > 0 && lastPage > 1 && !isLoading && (
            <Button onLoadMore={handleLoadMore} />
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
}