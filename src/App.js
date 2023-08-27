import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import FilmList from './pages/FilmList';
import FilmDetail from './pages/FilmDetail';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<FilmList/>} />
            <Route path="/film/:imdbID" exact element={<FilmDetail/>} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
