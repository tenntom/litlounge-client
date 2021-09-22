import React, { useContext, useState, useEffect } from "react"
import { WorkContext } from "./WorkProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import "./Work.css"
import { GenreContext } from "../genres/GenreProvider.js"
import { WorkTypeContext } from "../worktypes/WorkTypeProvider.js"


export const WorkForm = () => {
    const history = useHistory()
    const { createWork, editWork, getWorkById, deleteWork } = useContext(WorkContext)
    const { genres, getGenres } = useContext(GenreContext)
    const { getWorkTypes, workTypes, } = useContext(WorkTypeContext)
    const [workGenres, setWorkGenres] = useState([])

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

    useEffect(() => {
        getWorkTypes()
        getGenres()
    }, [])

    useEffect(() => {
        getWorkById(workId)
            .then((work) => {
                const genreArray = []
                work.genres.forEach(genre => { genreArray.push(genre.id) });
                setCurrentWork({
                    id: parseInt(workId),
                    title: work.title,
                    author: work.author,
                    workTypeId: parseInt(work.work_type.id),
                    description: work.description,
                    identifier: work.identifier,
                    urlLink: work.url_link,
                    postedById: work.posted_by.user.id,
                    // genres: genreArray
                })
                setWorkGenres(genreArray)
            })
    }, [workId])



    const handleControlledInputChange = (event) => {
        const newWorkState = { ...currentWork }
        newWorkState[event.target.name] = event.target.value
        setCurrentWork(newWorkState)
    }

    const handleCheckboxChange = (event) => {
        const copyOfWorkGenres = [...workGenres]
        const genreIndex = copyOfWorkGenres.indexOf(parseInt(event.target.value))
        if (genreIndex > -1) {
            copyOfWorkGenres.splice(genreIndex, 1)
        } else {
            copyOfWorkGenres.push(parseInt(event.target.value))
        }
        setWorkGenres(copyOfWorkGenres)
    }




    return (
        <form className="work">
            {
                (workId)
                    ? <h2 className="update_work">Update Work</h2>
                    : <h2 className="add_work">Add New Work</h2>

            }
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
                    <button className="btn-new-type btn-tiny"
                        onClick={() => {
                            history.push({ pathname: "/worktypes/new" })
                        }}
                    >Add Type
                    </button>
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
                    <label htmlFor="urlLink">Link: </label>
                    <input type="text" name="urlLink" autoFocus className="form-control"
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
                            console.log(workGenres.find((wg) => parseInt(wg) === parseInt(g.id)))
                            return (
                                <>
                                    <input type="checkbox" name="workGenre" value={g.id}
                                        onChange={handleCheckboxChange}
                                        checked={workGenres.some((wg) => wg === g.id)}
                                    />
                                    <label htmlFor="workGenre">{g.label}</label>
                                </>
                            )
                        })
                    }
                    <button className="btn-new-genre btn-tiny"
                        onClick={() => {
                            history.push({ pathname: "/genres/new" })
                        }}
                    >Add Genre
                    </button>
                </div>
            </fieldset>

            <div className="buttons">

                {
                    (workId)
                        ? <div className="edit-buttons">
                            <button type="submit"
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
                                        genres: workGenres
                                    })
                                        .then(() => history.push("/works"))
                                }}
                                className="btn btn-primary">Update</button>
                            <div className="work__delete">
                                <button className="btn btn-delete-work btn-tiny" onClick={e => {
                                    e.preventDefault()
                                    deleteWork(parseInt(workId))
                                        .then(() => history.push("/works")
                                        )
                                }}>
                                    Delete
                                </button>
                            </div>
                        </div>


                        : <button type="submit"
                            onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()

                                const work = {
                                    title: currentWork.title,
                                    author: currentWork.author,
                                    workTypeId: parseInt(currentWork.workTypeId),
                                    description: currentWork.description,
                                    identifier: currentWork.identifier,
                                    urlLink: currentWork.urlLink,
                                    postedById: currentWork.postedById,
                                    genres: workGenres
                                }

                                createWork(work)
                                    .then(() => history.push("/works"))
                            }}
                            className="btn btn-primary">Create</button>
                }
            </div>

        </form >
    )
}