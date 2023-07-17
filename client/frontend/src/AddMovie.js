import React, {useState, useEffect, useContext} from 'react'
import { ParentContext } from "./App"
import { Link } from 'react-router-dom'

function MovieInfo() { 
    const movies = useContext(ParentContext)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [released, setReleased] = useState('')
    const [director, setDirector] = useState('')
    const [watched, setWatched] = useState()
 
    const addMovie = async () => {
        const newMovie = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title[0].toUpperCase() + title.slice(1),
                img: image,
                description: description,
                released: released,
                director: director,
                watched: watched
            })
        }

        // console.log(newMovie);

        await fetch('http://localhost:3001', newMovie)
            .then(() => {alert('Movie added!'); window.location.reload()})
            .catch(err => {alert(`Error: ${err}`)})
    }

    return (
        <div>
            <Link to="/">Home</Link>

            <form>
                <label>Title:</label><br/>
                <input type='text' placeholder='Title' onChange={e => setTitle(e.target.value)}/>
                <br/>
                

                <label>Image:</label><br/>
                <input type='text' placeholder='Image Link' onChange={e => setImage(e.target.value)}/>
                <br/>
                

                <label>Description:</label><br/>
                <textarea placeholder='Description' onChange={e => setDescription(e.target.value)}/>
                <br/>
                

                <label>Date Released:</label><br/>
                <input type='date' onChange={e => setReleased(e.target.value)}/>
                <br/>
                

                <label>Director:</label><br/>
                <input type='text' placeholder='Director' onChange={e => setDirector(e.target.value)}/>
                <br/>

                <label>Watched:</label><br/>
                <input type="radio" id="Yes" value="Yes" name='watched' onChange={e => {
                        setWatched(true);
                    }
                }/><label htmlFor="Yes">Yes</label>
                <input type="radio" id="No" value="No" name='watched' onChange={e => {
                        setWatched(false);
                    }
                }/><label htmlFor="No">No</label>
                <br/>
                <button onClick={() => addMovie()}>Add Movie</button>
            </form>
            
            <h1>Current Movie List:</h1>
            <ul>
                {movies.map(element => <li key={element.id}>{element.title}&nbsp;</li>)}
            </ul>
        </div>
    )
}

export default MovieInfo