import { useContext, useState } from "react";
import { ParentContext } from "./App";
import { Link } from 'react-router-dom';

function WatchedList() {
    const movies = useContext(ParentContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [search, setSearch] = useState(searchTerm)

    const removeWatched = (movie) => {
      const removeWatched = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({watched: false})
      }

      fetch(`http://localhost:3001/${movie}`, removeWatched)
          .then(() => {alert('Movie removed from watched list!'); window.location.reload()})
          .catch(err => {alert(`Error: ${err}`)})
    }

    const renderWatchedList = () => {
        let watched = []
        for (let i=0; i < movies.length; i++) {
          if (movies[i].watched === true) {
            watched.push(movies[i])
          }
        }
    
        if (watched.length === 0) {
          return <p>No movies in watched list</p>
        }
        else if (searchTerm === '' && search === '') {
          return watched.map(element => 
          <li key={element.id}><Link to={`/movieinfo/${element.title}`}>{element.title}</Link>&nbsp;
          <button key={element.id} onClick={() => removeWatched(element.title)}>X</button>&nbsp;
          </li>)
        }
        else if (searchTerm === '' && search !== '') {
          setSearch(searchTerm)
          return watched.map(element => 
            <li key={element.id}><Link to={`/movieinfo/${element.title}`}>{element.title}</Link>&nbsp;
            <button key={element.id} onClick={() => removeWatched(element.title)}>X</button>&nbsp;
            </li>)
        }
        else {
          return watched.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase().trim())).map(filtered => 
          <li key={filtered.id}><Link to={`/movieinfo/${filtered.title}`}>{filtered.title}</Link>&nbsp;
          <button key={filtered.id} onClick={() => removeWatched(filtered.title)}>X</button>
          </li>)
        }
    }
    
    return (
        <div>
            <Link to="/">Home</Link>
            <input type='search' name='searchBox' placeholder='Search...' onChange={e => setSearchTerm(e.target.value)}/>
            <button onClick={() => setSearch(searchTerm)}>Search</button>
            <Link to="/watch">Movies to watch</Link>
            <ul>
                {renderWatchedList()}
            </ul>
        </div>
    )
}

export default WatchedList;