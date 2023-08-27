import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/FilmDetail.css'

const FilmDetail = () => {
  const { imdbID } = useParams();
  const [filmDetail, setFilmDetail] = useState(null);

  useEffect(() => {
    const fetchFilmDetail = async () => {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${imdbID}&apikey=8fc4a880`
      );
      setFilmDetail(response.data);
    };

    fetchFilmDetail();
  }, [imdbID]);

  if (!filmDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className='film-detail-container'>
      <h1>{filmDetail.Title}</h1>
      <div>
        <img src={filmDetail.Poster} alt={`${filmDetail.Title} Poster`} />
        <p>Yayın Tarihi: {filmDetail.Year}</p>
        <p>Süre: {filmDetail.Runtime}</p>
        <p>Tür: {filmDetail.Genre}</p>
        <p>Yönetmen: {filmDetail.Director}</p>
        <p>Oyuncular: {filmDetail.Actors}</p>
        <p>IMDb Puanı: {filmDetail.imdbRating}</p>
      </div>
    </div>
  );
};

export default FilmDetail;
