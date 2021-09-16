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

    const createTalk = (talk) => {
        return fetch("http://localhost:8000/talks", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(talk)
        })
        .then(getTalks)
    }

    const leaveTalk = talkId => {
        return fetch(`http://localhost:8000/talks/${ talkId }/signup`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
            .then(getTalks)
    }

    const joinTalk = talkId => {
        return fetch(`http://localhost:8000/talks/${talkId}/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
            .then(response => response.json())
            .then(getTalks)
    }

    return (
        <TalkContext.Provider value={{ talks, getTalks, createTalk, joinTalk, leaveTalk}} >
            { props.children }
        </TalkContext.Provider>
    )
}

