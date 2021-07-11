import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

const MovieItem = ({ title, id }) => {
  const [selectedMovie, setSelectedMovie, movieHistory, setMovieHistory] =
    useContext(MovieContext);

  const handleStateUpdate = () => {
    /**
     * FIX THE STUPID FUCKING STATE CLEAR WHEN INFO BUTTON PUSHED
     **/
    setSelectedMovie({ title: title, id: id });
    setMovieHistory((movieHistory) => [
      ...movieHistory,
      { title: title, id: id },
    ]);
  };

  return (
    <div
      className="m-2 p-3 d-flex flex-row justify-content-between align-items-center"
      key={id}
    >
      <h2 className="me-1">{title}</h2>

      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => handleStateUpdate()}
      >
        More Info
      </button>
    </div>
  );
};

export default MovieItem;
