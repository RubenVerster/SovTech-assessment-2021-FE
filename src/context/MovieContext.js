import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [moviesResults, setMoviesResults] = useState([]);
  const [movieHistory, setMovieHistory] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    title: null,
    id: null,
    director: null,
    releaseDate: null,
  });
  const [error, setError] = useState(null);
  const [messageResult, setMessageResult] = useState(
    'Search For A Star Wars Movie'
  );

  const value = [
    moviesResults,
    setMoviesResults,
    movieHistory,
    setMovieHistory,
    selectedMovie,
    setSelectedMovie,
    error,
    setError,
    messageResult,
    setMessageResult,
  ];

  return (
    <MovieContext.Provider value={value}>
      {props.children}
    </MovieContext.Provider>
  );
};
