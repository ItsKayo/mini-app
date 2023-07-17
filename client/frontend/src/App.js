import './App.css'
import WatchedList from './WatchedList'
import WatchList from './WatchList'
import MovieInfo from './MovieInfo'
import AddMovie from './AddMovie'
import Home from './Home'
import React, {useState, useEffect, createContext} from 'react'
import {Routes, Route, Link} from 'react-router-dom'

export const ParentContext = createContext();

function App() {
  // const movies = [
  //   {title: 'Mean Girls'},
  //   {title: 'Hackers'},
  //   {title: 'The Grey'},
  //   {title: 'Sunshine'},
  //   {title: 'Ex Machina'},
  // ];

  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])

  // console.log(movies)

  return (
    <ParentContext.Provider value={movies}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watched" element={<WatchedList />} />
        <Route path="/watch" element={<WatchList />} />
        <Route path="/movieinfo/:title" element={<MovieInfo />} />
        <Route path="/addmovie" element={<AddMovie />} />
      </Routes>
    </ParentContext.Provider>
  );
}

export default App;
