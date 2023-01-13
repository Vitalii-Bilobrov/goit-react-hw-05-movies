import { useState, useEffect } from 'react';
import { getTranding } from 'Services/api';
import { toast } from 'react-toastify';
import { Audio } from 'react-loader-spinner';
import { MoviesList } from 'components/moviesList/MoviesList';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      setError('');
      try {
        const data = await getTranding();
        setMovies(data.results);
      } catch (error) {
        setError('There is something wrong in your action');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, []);
  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <section>
      <h1>Tranding today</h1>
      {movies.length > 0 && <MoviesList movies={movies} />}
      {isLoading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      )}
    </section>
  );
};
