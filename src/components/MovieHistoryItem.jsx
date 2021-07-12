import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
// { title, id, director, releaseDate }
const MovieHistoryItem = (props) => {
  const [selectedMovie, setSelectedMovie] = useContext(MovieContext);
  console.log(`hist props`, props);

  return (
    <div
      key={props.id}
      className="m-2 p-3 d-flex flex-row justify-content-between align-items-center"
    >
      <h2 className="me-1">{props.title}</h2>

      <div
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() =>
          setSelectedMovie({
            title: props.title,
            id: props.id,
            director: props.director,
            releaseDate: props.releaseDate,
          })
        }
      >
        View Again
      </div>
    </div>
  );
};

export default MovieHistoryItem;
