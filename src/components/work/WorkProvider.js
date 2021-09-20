import React, { useState } from "react"

export const WorkContext = React.createContext()

export const WorkProvider = (props) => {
    const [works, setWorks] = useState([])
    const [workTypes, setTypes] = useState([])
    const [genres, setGenres] = useState([])

    const getWorks = () => {
        return fetch("http://localhost:8000/works", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
            .then(response => response.json())
            .then(setWorks)
    }

    const getWorkById = (id) => {
        return fetch(`http://localhost:8000/works/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
            .then(response => response.json())
    }

    const createWork = (work) => {
        return fetch("http://localhost:8000/works", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(work)
        })
        .then(response => response.json())
        .then(getWorks)
    }

    const editWork = (work) => {
        return fetch(`http://localhost:8000/works/${work.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(work)
        }).then(getWorks)
    }

    const getWorkTypes = () => {
        return fetch("http://localhost:8000/worktypes", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
        .then(res => res.json())
        .then(setTypes)
    }

    const getGenres = () => {
        return fetch("http://localhost:8000/genres", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
        .then(res => res.json())
        .then(setGenres)
    }

    return (
        <WorkContext.Provider value={{ works, workTypes, genres, setGenres, getGenres, getWorks, createWork, editWork, getWorkTypes, setTypes, getWorkById }} >
            {props.children}
        </WorkContext.Provider>
    )
}