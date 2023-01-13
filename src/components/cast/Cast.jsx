import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import css from './Cast.module.css';
import { getCast } from 'Services/api';

export const Cast = () => {
  const { moviesId } = useParams();
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    if (!moviesId) return;
    const fetchMovie = async () => {
      setError('');
      try {
        const data = await getCast(moviesId);

        setMovieData(data);
      } catch (error) {
        setError('There is something wrong in your action');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [moviesId]);
  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  if (!movieData) {
    return;
  }
  return movieData.length > 0 ? (
    <header>
      <div>
        <ul>
          {movieData.map(cast => (
            <li key={cast.id}>
              <img
                className={css.imgCast}
                src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                alt="movie poster"
              />
              <div>{`Name: ${cast.original_name}`}</div>
              <div>{`Character: ${cast.character}`}</div>
            </li>
          ))}
        </ul>
      </div>
    </header>
  ) : (
    <h4>There is not any information about it for now</h4>
  );
};
