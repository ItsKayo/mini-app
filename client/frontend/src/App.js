import './App.css';
import {useState, useEffect} from 'react'

function App() {
  // const movies = [
  //   {title: 'Mean Girls'},
  //   {title: 'Hackers'},
  //   {title: 'The Grey'},
  //   {title: 'Sunshine'},
  //   {title: 'Ex Machina'},
  // ];

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [search, setSearch] = useState(searchTerm)

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])

  const renderList = () => {
    if (searchTerm === '' && search === '') {
      return movies.map(element => <li key={element.id}>{element.title}</li>)
    }
    else if (searchTerm === '' && search !== '') {
      setSearch(searchTerm)
      return movies.map(element => <li key={element.id}>{element.title}</li>)
    }
    else {
      return movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase().trim())).map(filtered => <li key={filtered.id}>{filtered.title}</li>)
    }
  }

  return (
    <div className="App">
      <input type='search' name='searchBox' placeholder='Search...' onChange={e => setSearchTerm(e.target.value)}/>
      <button onClick={() => setSearch(searchTerm)}>Search</button>
      <ul>
        {renderList()}
      </ul>
    </div>
  );
}

export default App;
