import './App.css';
// import Request from './components/Request.tsx';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MovieItem from './components/MovieItem';
import MovieModal from './components/MovieModal';

import { MovieContext } from './context/MovieContext';

function App() {
  const [
    moviesResults,
    setMoviesResults,
    movieHistory,
    setMovieHistory,
    selectedMovie,
    setSelectedMovie,
  ] = useContext(MovieContext);

  const [searchParam, setSearchParam] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const searchMovieWithParam = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
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
      console.log(`movie respone data results`, response.data.results);
      // console.log(moviesResults)
      // console.log(response)
      if (response.data.results.length >= 1) {
        setMessage('We got some results (☞ﾟヮﾟ)☞');
      } else {
        setError('No results found... (╯°□°）╯︵ ┻━┻');
      }
      await setMoviesResults(response.data.results);
      console.log(`upadted movies in data call func`, moviesResults);
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
    moviesResults.map(({ title, episode_id }) => (
      <MovieItem title={title} id={episode_id} />
    ));

  const mappedHistory = movieHistory.map(({ title, episode_id }) => (
    <MovieItem title={title} id={episode_id} />
  ));

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
      </header>

      <div className="container text-light">
        <div className="row">
          <div className="col-lg-6 col-xs-12">
            <div className="row">
              <div className="col-12 p-3">
                {message && <h2 className="text-info">{message}</h2>}
              </div>
            </div>
            <div className="row bg-dark">
              <div className="col-xs-12 ">
                {moviesResults.length > 0 ? mappedResults : null}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xs-12">
            <h2>View History</h2>
            <div>
              {movieHistory.length < 1 ? 'No Search history' : mappedHistory}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <MovieModal />
    </div>
  );
}

export default App;
