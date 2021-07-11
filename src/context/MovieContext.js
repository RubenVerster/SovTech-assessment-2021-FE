import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [moviesResults, setMoviesResults] = useState([]);
  const [movieHistory, setMovieHistory] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({ title: null, id: null });

  const value = [
    moviesResults,
    setMoviesResults,
    movieHistory,
    setMovieHistory,
    selectedMovie,
    setSelectedMovie,
  ];

  return (
    <MovieContext.Provider value={value}>
      {props.children}
    </MovieContext.Provider>
  );
};
