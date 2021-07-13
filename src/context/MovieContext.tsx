import React, { createContext, useState } from 'react';

declare interface IContextState {
  moviesResults: any[];
  setMoviesResults: any;
  movieHistory: any;
  setMovieHistory: any;
  selectedMovie: any;
  setSelectedMovie: any;
  error: any;
  setError: any;
  messageResult: any;
  setMessageResult: any;
}

declare interface ISelectedMovie {
  title: string | null;
  id: number | null;
  director: string | null;
  releaseDate: string | null;
}
export const MovieContext = createContext<IContextState | null>(
  {} as IContextState
);

export const MovieProvider = ({ children }: any) => {
  const [moviesResults, setMoviesResults] = useState([]);
  const [movieHistory, setMovieHistory] = useState<ISelectedMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<ISelectedMovie>({
    title: null,
    id: null,
    director: null,
    releaseDate: null,
  });
  const [error, setError] = useState<null | string>(null);
  const [messageResult, setMessageResult] = useState<null | string>(
    'Search For A Star Wars Movie'
  );

  const value: any = [
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
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
