import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
// @ts-ignore
const MovieItem = ({ title, id, director, releaseDate }) => {
  // @ts-ignore
  const [selectedMovie, setSelectedMovie, movieHistory, setMovieHistory] =
    useContext(MovieContext);

  const handleStateUpdate = () => {
    /**
     * FIX THE STUPID FUCKING STATE CLEAR WHEN INFO BUTTON PUSHED
     * This poesse setSelectedMovie is the culprit -_-
     **/
    setSelectedMovie({ title, id, director, releaseDate });
    // @ts-ignore
    setMovieHistory((movieHistory) => [
      ...movieHistory,
      { title: title, id: id, director: director, releaseDate: releaseDate },
    ]);
  };

  return (
    <div
      key={id}
      className="m-2 p-3 d-flex flex-row justify-content-between align-items-center bg-dark"
    >
      <h2 className="me-1">{title}</h2>

      <div
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => handleStateUpdate()}
      >
        More Info
      </div>
    </div>
  );
};

export default MovieItem;
