import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'

const MovieResult = ({ title, id }) => {
  const [selectedMovie, setSelectedMovie] = useContext(MovieContext)
  const [movieHistory, setMovieHistory] = useContext(MovieContext)

  const handleStateUpdate = ({ title, id }) => {
    setSelectedMovie({ title: title, id: id })
    setMovieHistory((prevState) => prevState, { title: title, id: id })
  }

  return (
    <div
      className='m-2 p-3 d-flex flex-row justify-content-between align-items-center'
      key={id}
    >
      <h2 className='me-1'>{title}</h2>

      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        onClick={() => handleStateUpdate({ title, id })}
      >
        More Info
      </button>
    </div>
  )
}

export default MovieResult
