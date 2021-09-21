import React, { useState } from "react"

export const GenreContext = React.createContext()

export const GenreProvider = (props) => {
    const [ genres, setGenres ] = useState([])


    const getGenres = () => {
        return fetch("http://localhost:8000/genres", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
        .then(res => res.json())
        .then(setGenres)
    }

    const getGenreById = (id) => {
        return fetch(`http://localhost:8000/genres/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
            .then(response => response.json())
    }

    const createGenre = (genre) => {
        return fetch("http://localhost:8000/genres", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(genre)
        })
        .then(response => response.json())
        .then(getGenres)
    }

    const editGenre = (genre) => {
        return fetch(`http://localhost:8000/genres/${genre.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(genre)
        }).then(getGenres)
    }

    return (
        <GenreContext.Provider value={{ genres, setGenres, getGenres, createGenre, editGenre, getGenreById }} >
            {props.children}
        </GenreContext.Provider>)
}