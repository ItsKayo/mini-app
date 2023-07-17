import React, {useState, useEffect, useContext} from 'react'
import { ParentContext } from "./App";
import { Link } from 'react-router-dom';

function MovieInfo() { 
    const movies = useContext(ParentContext)

    let link = window.location.href;
    let linkArr = link.split('/');
    let linkTitle = linkArr.pop() || linkArr.pop();
    let movie = movies.find((e) => e.title == linkTitle) || localStorage.getItem('movie');

    useEffect(() => {
        localStorage.setItem('movie', JSON.stringify(movies))
    }, [movies])

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>{movie.title}</h1>
            <img src={`${movie.img}`} alt={`${movie.title}`}/>
            <h3>Description</h3>
            <p>{movie.description}</p>
            <h3>Released</h3>
            <p>{movie.released}</p>
            <h3>Director</h3>
            <p>{movie.director}</p>
        </div>
    )
}

export default MovieInfo