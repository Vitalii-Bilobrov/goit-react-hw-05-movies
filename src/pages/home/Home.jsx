import { Outlet, Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <Outlet />
      <ul>
        <li></li>
      </ul>
    </div>
  );
};
