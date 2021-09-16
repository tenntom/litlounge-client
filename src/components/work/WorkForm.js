import React, { useContext, useState, useEffect } from "react"
import { WorkContext } from "./WorkProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import "./Work.css"


export const WorkForm = () => {
    const history = useHistory()
    const { createWork, editWork, getWorkTypes, workTypes, getWorkById } = useContext(WorkContext)

    const [currentWork, setCurrentWork] = useState({
        title: "",
        author: "",
        workType: 0,
        description: "",
        identifier: "",
        url_link: "",
        posted_by: 0, //need to set to current user
        genres: []
    })

    const {workId} = useParams()


    useEffect(() => {
        getWorkTypes()
    }, [])

    useEffect(() => {
        getWorkById(workId)
            .then((work) => {
                setCurrentWork({
                    id: parseInt(workId),
                    title: work.title,
                    author: work.author,
                    workType: work.workType,
                    description: work.description,
                    identifier: work.identifier,
                    url_link: work.url_link,
                    posted_by: work.posted_by.id,
                    genres: [work.genres]
                })
            })
    }, [workId])


    const handleControlledInputChange = (event) => {
        const newWorkState = { ...currentWork }
        newWorkState[event.target.name] = event.target.value
        setCurrentWork(newWorkState)
    }


    return (
        <form className="work">
            <h2 className="add_work">Add New Work</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentWork.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="WorkTypeId">Work Type: </label>
                    <select name="WorkTypeId" className="form-control" value={currentWork.workTypeId} onChange={handleControlledInputChange}>
                        <option value="0">Select a type</option>
                        {workTypes.map(wt => (
                            <option key={wt.id} value={wt.id}>
                                {wt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentWork.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="identifier">Identifier: </label>
                    <input type="text" name="identifier" required autoFocus className="form-control"
                        value={currentWork.identifier}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="url_link">Url Link: </label>
                    <input type="text" name="url_link" required autoFocus className="form-control"
                        value={currentWork.url_link}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            {
                (workId)
                    ? <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
                            editWork({
                                id: parseInt(workId),
                                name: currentWork.name,
                                description: currentWork.description,
                                maker: currentWork.maker,
                                number_of_players: parseInt(currentWork.numberOfPlayers),
                                WorkTypeId: parseInt(currentWork.WorkTypeId),
                                WorkrId: parseInt(currentWork.WorkrId)
                            })
                                .then(() => history.push("/works"))
                        }}
                        className="btn btn-primary">Edit</button>

                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const Work = {
                                name: currentWork.name,
                                description: currentWork.description,
                                maker: currentWork.maker,
                                number_of_players: parseInt(currentWork.numberOfPlayers),
                                WorkTypeId: parseInt(currentWork.WorkTypeId),
                                WorkrId: parseInt(currentWork.WorkrId)
                            }

                            createWork(Work)
                                .then(() => history.push("/works"))
                        }}
                        className="btn btn-primary">Create</button>
            }

        </form>
    )
}