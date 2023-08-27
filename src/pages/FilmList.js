import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilmCard from '../components/FilmCard';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilms } from '../redux/actions';
import '../styles/FilmList.css'

const mapStateToProps = (state) => {
  return {
    films: state.films,
  };
};

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [releaseYear, setReleaseYear] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchText, setSearchText] = useState('Pokemon');
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");

  useEffect(() => {
    const fetchFilms = async () => {
      if (selectedValue === "episode"){
        const response = await axios.get(
          `http://www.omdbapi.com/?t=${searchText}&y=${releaseYear}&page=${currentPage}&season=${season}&episode=${episode}&apikey=8fc4a880`
        );
        setFilms( [response.data] || []);
      }
      else {
        const response = await axios.get(
          `http://www.omdbapi.com/?s=${searchText}&y=${releaseYear}&page=${currentPage}&type=${selectedValue}&apikey=8fc4a880`
        );
        setFilms(response.data.Search || []);
      }
      
    };

    fetchFilms();
  }, [currentPage, searchText, releaseYear, selectedValue, season, episode]);

  return (
    <div className='film-list-page'>
      <h2> Film ara:
      <input
        type="text"
        placeholder="Film adı"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Vizyon yılı"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
      />
        <select value={selectedValue} onChange={(e) => {setSelectedValue(e.target.value);}}>
            <option value="">Arama Tipi Seçiniz</option>
            <option value="movie">Film</option>
            <option value="series">Dizi</option>
            <option value="episode">Bölüm</option>
        </select>
        {selectedValue === "episode" && (  
          <div>
            <label> Sezon: </label>
            <input
              type="text"
              placeholder="Sezon"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            />
            <label> Bölüm: </label>
            <input
              type="text"
              placeholder="Bölüm"
              value={episode}
              onChange={(e) => setEpisode(e.target.value)}
            />
          </div>
        )}
      </h2>
      {films.length < 1 ? <div>No matches...</div> : 
          <div>
              <div className="film-card-container">
                {films.map((film) => (
                  <Link key={film.imdbID} to={`/film/${film.imdbID}`}>
                    <FilmCard film={film} />
                  </Link>
                ))}
              </div>
              <div>
                <Button variant="outlined" onClick={() => {setCurrentPage(currentPage - 1);
                    window.scrollTo({ top: 0, left: 0})
                  }} 
                  disabled={currentPage === 1}>Önceki Sayfa</Button>
                  <Button variant="contained" onClick={() => {setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})
                  }} >Sonraki Sayfa</Button>
              </div>
          </div>
      }
      </div>
  );
};

export default connect(mapStateToProps, { setFilms })(FilmList);
