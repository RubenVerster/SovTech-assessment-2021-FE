import './App.css';
// import Request from './components/Request.tsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieResult from './components/MovieResult';

/**
 * TODO
 * Document app
 * fix message setting logic
 */
function App() {
  const [searchParam, setSearchParam] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [moviesResults, setMoviesResults] = useState([]);

  // async function getMoviesFromAPI() {
  //   try {
  //     const response = await axios.get('https://swapi.dev/api/films/');
  //     console.log(`all data from api`, response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEffect(() => {
  //   getMoviesFromAPI();
  // }, []);

  const searchMovieWithParam = async (event) => {
    event.preventDefault();

    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/films/?search=${searchParam}`
      );
      setMoviesResults(response.data.results);
      console.log(moviesResults);
      console.log(response);
      if (moviesResults.length >= 1) {
        return setMessage('We got some results ☜(ﾟヮﾟ☜)');
      }
      if (moviesResults.length < 1) {
        setError('No Movies Found');
      }
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

  const mappedResults = moviesResults.map(({ title, episode_id }) => (
    <MovieResult title={title} id={episode_id} />
  ));

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
    <div className="bg-dark text-light text-center">
      <header>
        <h1 className="text-primary">(♥¬♥;)</h1>
        <form onSubmit={(event) => searchMovieWithParam(event)}>
          <input
            value={searchParam}
            placeholder="Search A Star Wars Movie"
            onChange={(event) => updateInputField(event)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {error && <div className="text-danger">{error}</div>}
        {message && <div className="text-info">{message}</div>}
        {loading && <div className="text-secondary">Checking for a movie</div>}

        {/* <button onClick={() => getWeather()} className="btn btn-warning">
          GET WEATHER
        </button> */}
      </header>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">{mappedResults}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
