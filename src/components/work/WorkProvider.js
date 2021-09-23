import React, { useState } from "react"

export const WorkContext = React.createContext()

export const WorkProvider = (props) => {
    const [works, setWorks] = useState([])

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

    const deleteWork = workId => {
        return fetch(`http://localhost:8000/works/${workId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
            },
            method: "DELETE"
        }).then(getWorks)
    }

    const [ workSearch, setWorkSearch ] = useState("")

    return (
        <WorkContext.Provider value={{ works, getWorks, createWork, editWork, getWorkById, deleteWork, workSearch, setWorkSearch }} >
            {props.children}
        </WorkContext.Provider>
    )
}