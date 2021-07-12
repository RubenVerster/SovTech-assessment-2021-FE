import './App.css';
// import Request from './components/Request.tsx';
import { useState, useContext, useEffect } from 'react';
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
  ] = useContext(MovieContext);

  const [searchParam, setSearchParam] = useState('');

  const [loading, setLoading] = useState(null);

  const searchMovieWithParam = async (event) => {
    event.preventDefault();
    setError(null);
    setMessageResult(null);
    setLoading(true);
    setMoviesResults([]);

    if (searchParam === '') {
      setLoading(false);
      return setError('Please fill in the field to search for a movie');
    }

    try {
      const response = await axios.get(
        `https://swapi.dev/api/films/?search=${searchParam}`
      );
      if (response.data.results.length >= 1) {
        setMessageResult('We got some results (☞ﾟヮﾟ)☞');
      } else {
        setMessageResult('No results found... (╯°□°）╯︵ ┻━┻');
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

  const updateInputField = ({ target }) => {
    let { value } = target;
    setError(null);
    setSearchParam(value);
  };

  const mappedResults =
    moviesResults.length > 0 &&
    moviesResults.map(({ title, episode_id, director, release_date }) => (
      <MovieItem
        title={title}
        id={episode_id}
        director={director}
        releaseDate={release_date}
      />
    ));

  const mappedHistory = movieHistory.map(
    ({ title, id, director, releaseDate }) => (
      <MovieHistoryItem
        title={title}
        id={id}
        director={director}
        releaseDate={releaseDate}
      />
    )
  );

  //API DETAILS FOR WEATHER APP
  // const getWeather = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.5&lon=0`
  //     );
  //     console.log(`weather`, response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

        {loading && <div className="text-secondary">Checking for a movie</div>}
        {error && <h2 className="text-danger">{error}</h2>}

        {/* <button onClick={() => getWeather()} className="btn btn-warning">
          GET WEATHER
        </button> */}
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
            {movieHistory.length > 0 ? (
              <button
                class="btn btn-danger mb-2"
                onClick={() => setMovieHistory([])}
              >
                {' '}
                Clear History
              </button>
            ) : null}

            <div>
              {movieHistory.length < 1 ? 'No Search history' : mappedHistory}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
