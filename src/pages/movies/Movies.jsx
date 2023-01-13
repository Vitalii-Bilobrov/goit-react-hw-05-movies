import { getMovieByQuery } from 'Services/api';
import { MoviesList } from 'components/moviesList/MoviesList';
import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { useSearchParams } from 'react-router-dom';
import { Form } from 'components/form/Form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('q');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovie = async () => {
      setError('');
      setIsLoading(true);
      try {
        const data = await getMovieByQuery(searchQuery);

        setMovies(data.results);
      } catch (error) {
        setError('There is something wrong in your action');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [searchQuery]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <section>
      <div>
        <h1>SEARCH MOVIE</h1>
        <Form />
        {movies.length > 0 && <MoviesList movies={movies} />}
      </div>
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
