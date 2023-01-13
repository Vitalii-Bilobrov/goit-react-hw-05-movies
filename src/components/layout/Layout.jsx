import { Outlet, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import css from './layout.module.css';

export const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <nav>
          <Link className={css.linksMain} to="/">
            Home
          </Link>
          <Link className={css.linksMain} to="/movies">
            Movies
          </Link>
        </nav>
      </header>
      <Outlet />
      <ToastContainer />
    </>
  );
};
