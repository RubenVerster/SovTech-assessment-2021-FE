import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import MovieModal from './components/MovieModal';

ReactDOM.render(
  <React.StrictMode>
    <MovieProvider>
      <App />
      <MovieModal />
    </MovieProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
