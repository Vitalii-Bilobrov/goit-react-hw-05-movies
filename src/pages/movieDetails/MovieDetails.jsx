import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMoviesById } from 'Services/api';
import css from './MovieDetails.module.css';
import { Audio } from 'react-loader-spinner';

export const MoviesDetails = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { moviesId } = useParams();
  const location = useLocation;
  const backLink = location?.state?.from ?? '/';

  useEffect(() => {
    if (!moviesId) return;
    const fetchMovie = async () => {
      setError('');
      try {
        const data = await getMoviesById(moviesId);

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

  return (
    <section className={css.section}>
      {movieData && (
        <>
          <Link className={css.linkGoBack} to={backLink}>
            GO BACK
          </Link>
          <div className={css.movieCard}>
            <img
              className={css.imgMain}
              src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
              alt="movie poster"
            />

            <div>
              <ul>
                <li className={css.cardListItem}>
                  <h1>{`${
                    movieData.original_title
                  }(${movieData.release_date?.slice(0, 4)})`}</h1>
                  <div>{`User score: ${
                    movieData.vote_average?.toFixed() * 10
                  }%`}</div>
                </li>
                <li className={css.cardListItem}>
                  <h2> Overview</h2>
                  <div>{movieData.overview}</div>
                </li>
                <li className={css.cardListItem}>
                  <h2> Genres</h2>
                  {movieData.genres?.map(g => g.name).join(', ')}
                </li>
              </ul>
            </div>
          </div>
          <h3>Additional information</h3>
          <ul className={css.navLinks}>
            <li>
              <Link to="cast" state={{ from: backLink }}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={{ from: backLink }}>
                Reviews
              </Link>
            </li>
          </ul>
          <Outlet />
        </>
      )}
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
