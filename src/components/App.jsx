import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Movies } from '../pages/movies/Movies';
import { Layout } from '../components/layout/Layout';
import { MoviesDetails } from '../pages/movieDetails/MovieDetails';
import { Cast } from '../components/cast/Cast';
import { Reviews } from '../components/reviews/Reviews';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:moviesId" element={<MoviesDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};
