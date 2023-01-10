import { Outlet, Link } from 'react-router-dom';
export const MoviesDetails = () => {
  return (
    <div>
      <div>Additional information</div>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};
