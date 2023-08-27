import React from 'react';
import '../styles/FilmCard.css';

const FilmCard = ({ film }) => {
  return (
    <div className="film-card">
      <img src={film.Poster} alt={`${film.Title} Poster`} />
      <h3>{film.Title}</h3>
      <p>Yayın Tarihi: {film.Year}</p>
      <p>IMDb ID: {film.imdbID}</p>
    </div>
  );
};

export default FilmCard;
