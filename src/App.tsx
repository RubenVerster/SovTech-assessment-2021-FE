import './App.css';
import { useState, useContext } from 'react';
import axios from 'axios';
import MovieItem from './components/MovieItem';
import MovieHistoryItem from './components/MovieHistoryItem';

import { MovieContext } from './context/MovieContext';

function App() {
  const [
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
  ]: any = useContext(MovieContext);

  const [searchParam, setSearchParam] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const searchMovieWithParam = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setError(null);
    setMessageResult(null);
    setLoading(true);
    setMoviesResults([]);

    if (searchParam === '') {
      setLoading(false);
      return setError('Please fill in the field to search for a movie');
    }

    //Easter Egg
    if (searchParam.toLowerCase() === 'hello there') {
      setLoading(false);
      return setMessageResult('General Kenobi');
    }

    try {
      const response = await axios.get(
        `https://swapi.dev/api/films/?search=${searchParam}`
      );
      if (response.data.results.length >= 1) {
        setMessageResult('We got some results (☞ﾟヮﾟ)☞');
      } else {
        setMessageResult(
          'No results found... (╯°□°）╯︵ ┻━┻ (maybe search "Hello there")'
        );
      }
      console.log(`search results`, response.data.results);
      await setMoviesResults(response.data.results);
    } catch (error) {
      setError(
        'Could Not Reach Servers... Please check your connection ༼ つ ◕_◕ ༽つ'
      );
      console.error(error);
    }
    setLoading(false);
  };

  const updateInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    setError(null);
    setSearchParam(value);
  };

  const mappedResults =
    moviesResults.length > 0 &&
    // @ts-ignore
    moviesResults.map((movie) => (
      <MovieItem
        title={movie.title}
        id={movie.episode_id}
        director={movie.director}
        releaseDate={movie.release_date}
      />
    ));

  const mappedHistory = movieHistory.map((histMovie: any) => (
    <MovieHistoryItem
      title={histMovie.title}
      id={histMovie.id}
      director={histMovie.director}
      releaseDate={histMovie.releaseDate}
    />
  ));

  return (
    <div className="app-container text-center ">
      <header className="header bg-dark pb-3 mb-5">
        <h1 className="text-light">
          Willkommen bei der einfachsten Star Wars-App
        </h1>
        <h1 className="text-secondary">
          (<span className="text-danger">♥</span>¬
          <span className="text-danger">♥</span>;)
        </h1>
        <div className="d-flex flex-column align-items-center p-2">
          <form
            className="w-100"
            // @ts-ignore

            onSubmit={(event) => searchMovieWithParam(event)}
          >
            <div className="input-group input-field mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search A Movie"
                aria-label="Search A Movie"
                aria-describedby="button-addon2"
                value={searchParam}
                onChange={(event) => updateInputField(event)}
              />

              <button
                className="btn btn-outline-primary"
                type="submit"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {loading && <h2 className="text-secondary">Searching the Cosmos</h2>}
        {error && <h2 className="text-danger">{error}</h2>}
        {messageResult && <h2 className="text-primary">{messageResult}</h2>}
      </header>

      <div className="container text-light">
        <div className="row">
          <div className="col-lg-6 col-xs-12">
            <div className="row">
              <div className="col-xs-12 ">
                {moviesResults.length > 0 ? mappedResults : null}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xs-12">
            <h2>View History</h2>
            {movieHistory.length > 0 && (
              <button
                className="btn btn-danger mb-2"
                onClick={() => setMovieHistory([])}
              >
                Clear History
              </button>
            )}

            <div>
              {movieHistory.length < 1 ? 'No Search History' : mappedHistory}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
