import { Outlet } from 'react-router-dom';
export const Movies = () => {
  return (
    <div>
      <form>
        <label>
          <input type="text" />
          <button type="submit">Search</button>
        </label>
      </form>
      <Outlet />
    </div>
  );
};
