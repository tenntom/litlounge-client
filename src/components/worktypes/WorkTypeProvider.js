import React, { useState } from "react"

export const WorkTypeContext = React.createContext()

export const WorkTypeProvider = (props) => {
    const [ workTypes, setWorkTypes ] = useState([])


    const getWorkTypes = () => {
        return fetch("http://localhost:8000/worktypes", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
        .then(res => res.json())
        .then(setWorkTypes)
    }

    const getWorkTypeById = (id) => {
        return fetch(`http://localhost:8000/worktypes/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`
            }
        })
            .then(response => response.json())
    }

    const createWorkType = (workType) => {
        return fetch("http://localhost:8000/worktypes", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workType)
        })
        .then(response => response.json())
        .then(getWorkTypes)
    }

    const editWorkType = (workType) => {
        return fetch(`http://localhost:8000/WorkTypes/${workType.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ll_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workType)
        }).then(getWorkTypes)
    }

    return (
        <WorkTypeContext.Provider value={{ workTypes, setWorkTypes, getWorkTypes, createWorkType, editWorkType, getWorkTypeById }} >
            {props.children}
        </WorkTypeContext.Provider>)
}