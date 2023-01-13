import { useSearchParams } from 'react-router-dom';

export const Form = () => {
  const [, setSearchParams] = useSearchParams();
  const handleSubmit = e => {
    e.preventDefault();

    setSearchParams({ q: e.target.elements.query.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type={'text'} name="query" />
        <button type="submit">SEARCH</button>
      </label>
    </form>
  );
};
