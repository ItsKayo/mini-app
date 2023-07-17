import React, {useState, useEffect, useContext} from 'react'
import { ParentContext } from "./App";
import { Link } from 'react-router-dom';

function Home() {
    const movies = useContext(ParentContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [search, setSearch] = useState(searchTerm)

    const renderList = () => {
        if (movies.length === 0) {
          return <p>No movies in list</p>
        }
        else if (searchTerm === '' && search === '') {
          return movies.map(element => 
            <li key={element.id}><Link to={`/movieinfo/${element.title}`}>{element.title}</Link>&nbsp;
            <button key={element.id} onClick={() => deleteMovie(element.title)}>X</button>&nbsp;
            <button key={'watched' + element.id} onClick={() => watchedMovie(element.title)}>Watched</button>
            </li>)
        }
        else if (searchTerm === '' && search !== '') {
          setSearch(searchTerm)
          return movies.map(element => 
            <li key={element.id}><Link to={`/movieinfo/${element.title}`}>{element.title}</Link>&nbsp;
            <button key={element.id} onClick={() => deleteMovie(element.title)}>X</button>&nbsp;
            <button key={'watched' + element.id} onClick={() => watchedMovie(element.title)}>Watched</button>
            </li>)
        }
        else {
          return movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase().trim())).map(filtered => 
          <li key={filtered.id}><Link to={`/movieinfo/${filtered.title}`}>{filtered.title}</Link>&nbsp;
          <button key={filtered.id} onClick={() => deleteMovie(filtered.title)}>X</button>&nbsp;
          <button key={'watched' + filtered.id} onClick={() => watchedMovie(filtered.title)}>Watched</button>
          </li>)
        }
      }
    
    const deleteMovie = (movie) => {
        // console.log(`http://localhost:3001/${movie}`);
        fetch(`http://localhost:3001/${movie}`, {method: 'DELETE'})
            .then(() => {alert('Movie removed!'); window.location.reload()})
            .catch(err => {alert(`Error: ${err}`)})
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
        <div className="App">
            <input type='search' name='searchBox' placeholder='Search...' onChange={e => setSearchTerm(e.target.value)}/>
            <button onClick={() => setSearch(searchTerm)}>Search</button>
            <Link to="/addmovie">Add Movie</Link>
            <Link to="/watch">Movies to watch</Link>
            <Link to="/watched">Watched movies</Link>
            <ul>
            {renderList()}
            </ul>
        </div>
    )
}

export default Home;