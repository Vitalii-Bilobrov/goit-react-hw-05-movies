import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getReviews } from 'Services/api';

export const Reviews = () => {
  const { moviesId } = useParams();
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    if (!moviesId) return;
    const fetchMovie = async () => {
      setError('');
      try {
        const data = await getReviews(moviesId);

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
    <section>
      <div>
        <ul>
          {movieData?.map(review => (
            <li key={review.id}>
              <div>{`Author
: ${review.author}`}</div>
              <br />
              <div>{`${review.content}`}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ) : (
    <h4>There is not any reviews for now</h4>
  );
};
