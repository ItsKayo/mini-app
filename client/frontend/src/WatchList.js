import { useContext, useState } from "react";
import { ParentContext } from "./App";
import { Link } from 'react-router-dom';

function WatchList() {
    const movies = useContext(ParentContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [search, setSearch] = useState(searchTerm)

    const renderWatchList = () => {
        let watched = []
        for (let i=0; i < movies.length; i++) {
          if (movies[i].watched === false) {
            watched.push(movies[i])
          }
        }
    
        if (watched.length === 0) {
            return <p>No movies in watched list</p>
          }
          else if (searchTerm === '' && search === '') {
            return watched.map(element => 
            <li key={element.id}><Link to={`/movieinfo/${element.title}`}>{element.title}</Link>&nbsp;
            <button key={element.id} onClick={() => watchedMovie(element.title)}>Watched</button>&nbsp;
            </li>)
          }
          else if (searchTerm === '' && search !== '') {
            setSearch(searchTerm)
            return watched.map(element => 
              <li key={element.id}><Link to={`/movieinfo/${element.title}`}>{element.title}</Link>&nbsp;
              <button key={element.id} onClick={() => watchedMovie(element.title)}>Watched</button>&nbsp;
              </li>)
          }
          else {
            return watched.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase().trim())).map(filtered => 
            <li key={filtered.id}><Link to={`/movieinfo/${filtered.title}`}>{filtered.title}</Link>&nbsp;
            <button key={filtered.id} onClick={() => watchedMovie(filtered.title)}>Watched</button>
            </li>)
          }
    }

    const watchedMovie = (movie) => {
        const addWatched = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({watched: true})
        }

        fetch(`http://localhost:3001/${movie}`, addWatched)
            .then(() => {alert('Movie added to watched list!'); window.location.reload()})
            .catch(err => {alert(`Error: ${err}`)})
    }
    
    return (
        <div>
            <Link to="/">Home</Link>
            <input type='search' name='searchBox' placeholder='Search...' onChange={e => setSearchTerm(e.target.value)}/>
            <button onClick={() => setSearch(searchTerm)}>Search</button>
            <Link to="/watched">Watched movies</Link>
            <ul>
                {renderWatchList()}
            </ul>
        </div>
    )
}

export default WatchList;