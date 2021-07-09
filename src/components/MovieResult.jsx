import React from 'react';

const MovieResult = ({ title, episode_id }) => {
  return (
    <div key={episode_id}>
      <h2>{title}</h2>
      <button
        className="btn btn-info"
        onClick={() => alert(`Details for ${title}: Movie id = ${episode_id}`)}
      >
        View More info
      </button>
    </div>
  );
};

export default MovieResult;
