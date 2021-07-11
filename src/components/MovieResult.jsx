import React from 'react'

const MovieResult = ({ title, id }) => {
  return (
    <div
      className='m-2 p-3 d-flex flex-row justify-content-between align-items-center'
      key={id}
    >
      <h2 className='me-1'>{title}</h2>

      <button
        type='button'
        class='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        onClick={() =>
          alert(`pass data Details for ${title}: Movie id = ${id}`)
        }
      >
        More Info
      </button>
    </div>
  )
}

export default MovieResult
