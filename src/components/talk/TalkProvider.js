import React, { useState } from "react"

export const TalkContext = React.createContext()

export const TalkProvider = (props) => {
    const [ talks, setTalks ] = useState([])

    const getTalks = () => {
        return fetch("http://localhost:8000/talks", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
            .then(response => response.json())
            .then(setTalks)
    }

    const getTalkById = (id) => {
        return fetch(`http://localhost:8000/talks/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
            .then(response => response.json())
    }

    const createTalk = (talk) => {
        return fetch("http://localhost:8000/talks", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(talk)
        })
            .then(response => response.json())
            .then(getTalks)
    }

    const editTalk = (talk) => fetch(`http://localhost:8000/talks/${talk.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ll_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(talk)
    })
        .then(getTalks)

    const deleteTalk = talkId => {
        return fetch(`http://localhost:8000/talks/${talkId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
            },
            method: "DELETE"
        }).then(getTalks)
    }

    const leaveTalk = talkId => {
        return fetch(`http://localhost:8000/talks/${talkId}/signup`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(getTalks)
    }

    const joinTalk = talkId => {
        return fetch(`http://localhost:8000/talks/${talkId}/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())    
        .then(getTalks)
    }

    const [ searchTerms, setSearchTerms ] = useState("")

    

    return (
        <TalkContext.Provider value={{ talks, getTalks, createTalk, getTalkById, editTalk, deleteTalk, joinTalk, leaveTalk, searchTerms, setSearchTerms}} >
            { props.children }
        </TalkContext.Provider>
    )
}

