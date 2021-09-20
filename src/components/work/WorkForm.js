import React, { useContext, useState, useEffect } from "react"
import { WorkContext } from "./WorkProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import "./Work.css"


export const WorkForm = () => {
    const history = useHistory()
    const { genres, getGenres, createWork, editWork, getWorkTypes, workTypes, getWorkById } = useContext(WorkContext)
    const [workGenres, setWorkGenres] = useState()

    const [currentWork, setCurrentWork] = useState({
        title: "",
        author: "",
        workTypeId: 0,
        description: "",
        identifier: "",
        urlLink: "",
        genres: []
    })

    const { workId } = useParams()

    console.log(genres)


    useEffect(() => {
        getWorkTypes()
        getGenres()
    }, [])

    useEffect(() => {
        getWorkById(workId)
            .then((work) => {
                setCurrentWork({
                    id: parseInt(workId),
                    title: work.title,
                    author: work.author,
                    workTypeId: parseInt(work.work_type.id),
                    description: work.description,
                    identifier: work.identifier,
                    urlLink: work.url_link,
                    postedById: work.posted_by.id,
                    genres: work.genres
                })
            })
    }, [workId])

    // useEffect(() => {
    //     setWorkGenres()
    // })


    const handleControlledInputChange = (event) => {
        const newWorkState = { ...currentWork }
        newWorkState[event.target.name] = event.target.value
        setCurrentWork(newWorkState)
    }

    const handleCheckboxChange = (event) => {
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
                    <label htmlFor="author">Author: </label>
                    <input type="text" name="author" required autoFocus className="form-control"
                        value={currentWork.author}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="workTypeId">Work Type: </label>
                    <select name="workTypeId" className="form-control" value={currentWork.workTypeId} onChange={handleControlledInputChange}>
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
                        value={currentWork.urlLink}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genre">Genres: </label>
                    {
                        genres.map(g => {
                            return (
                                <>
                                    <input type="checkbox" name="workGenre" value={g.id} 
                                    onClick={() => {
                                        console.log(g.id)
                                        // const copyOfWorkGenres = [...workGenres];
                                        // g.id in copyOfWorkGenres
                                        // ? copyOfWorkGenres.pop(g.id)
                                        // : copyOfWorkGenres.push(g.id)
                                    }}
                                    />
                                    <label htmlFor="workGenre">{g.label}</label>
                                </>
                            )
                        })
                    }
                </div>
            </fieldset>

            {
                (workId)
                    ? <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
                            editWork({
                                id: currentWork.id,
                                title: currentWork.title,
                                author: currentWork.author,
                                workTypeId: parseInt(currentWork.workTypeId),
                                description: currentWork.description,
                                identifier: currentWork.identifier,
                                urlLink: currentWork.urlLink,
                                postedById: currentWork.postedById,
                                genres: [3,4]
                            })
                                .then(() => history.push("/works"))
                        }}
                        className="btn btn-primary">Update</button>

                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const Work = {
                                title: currentWork.title,
                                author: currentWork.author,
                                workTypeId: parseInt(currentWork.workTypeId),
                                description: currentWork.description,
                                identifier: currentWork.identifier,
                                urlLink: currentWork.url_link,
                                postedById: currentWork.postedById,
                                genres: [1,2]
                            }

                            createWork(Work)
                                .then(() => history.push("/works"))
                        }}
                        className="btn btn-primary">Create</button>
            }

        </form >
    )
}