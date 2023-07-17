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
            <section className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </section>

            <section className="addForm">
                <form>
                    <div className="formSection">
                        <label>Title:</label>
                        <input type='text' placeholder='Title' onChange={e => setTitle(e.target.value)}/>
                    </div>
                    
                    <div className="formSection">
                        <label>Image:</label>
                        <input type='text' placeholder='Image Link' onChange={e => setImage(e.target.value)}/>
                    </div>
                    
                    <div className="formSection">
                        <label>Description:</label>
                        <textarea placeholder='Description' onChange={e => setDescription(e.target.value)}/>
                    </div>

                    <div className="formSection">
                        <label>Date Released:</label>
                        <input type='date' onChange={e => setReleased(e.target.value)}/>
                    </div>

                    <div className="formSection">
                        <label>Director:</label>
                        <input type='text' placeholder='Director' onChange={e => setDirector(e.target.value)}/>
                    </div>

                    <div className="formSection">
                        <label>Watched:</label>
                        <input type="radio" id="Yes" value="Yes" name='watched' onChange={e => {setWatched(true);}}/>
                        <label htmlFor="Yes">Yes</label>
                        <input type="radio" id="No" value="No" name='watched' onChange={e => {setWatched(false);}}/>
                        <label htmlFor="No">No</label>
                    </div>

                    <div className="formSection">
                        <button onClick={() => addMovie()}>Add Movie</button>
                    </div>
                </form>
            </section>
            
            <div className='current'>
                <section>
                    <h1>Current Movie List:</h1>
                    <ul>
                        {movies.map(element => <li key={element.id}>{element.title}&nbsp;</li>)}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default MovieInfo