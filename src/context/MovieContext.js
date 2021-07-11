import React, { createContext, useState } from 'react'

export const MovieContext = createContext()

export const MovieProvider = (props) => {
  const [moviesResults, setMoviesResults] = useState([])
  const [movieHistory, setMovieHistory] = useState([])

  const value = [moviesResults, setMoviesResults, movieHistory, setMovieHistory]

  return (
    <MovieContext.Provider value={value}>
      {props.children}
    </MovieContext.Provider>
  )
}
