import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';

function MovieModal() {
  const [selectedMovie, setSelectedMovie] = useContext(MovieContext);

  const clearState = () => {
    setSelectedMovie({
      title: null,
      id: null,
      director: null,
      releaseDate: null,
    });
  };

  useEffect(() => {
    console.log(`modal movie deets`, selectedMovie);
  }, [selectedMovie]);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {selectedMovie.title}
            </h5>

            <div
              type="button"
              className="btn-close"
              // data-bs-dismiss="modal"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              aria-label="Close"
              onClick={() => clearState()}
            ></div>
          </div>
          <div className="modal-body">
            <h3>Director: {selectedMovie.director}</h3>
            <h4>Movie Number: {selectedMovie.id}</h4>
          </div>
          <div className="ms-3">Date Created: {selectedMovie.releaseDate}</div>

          <div className="modal-footer">
            <div
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => clearState()}
            >
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
