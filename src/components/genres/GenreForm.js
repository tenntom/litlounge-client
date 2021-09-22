import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GenreContext } from "./GenreProvider"
import { WorkContext } from "../work/WorkProvider"


export const GenreForm = () => {

    const history = useHistory()

    const { genres, setGenres, getGenres, getGenreById, createGenre, editGenre } = useContext(GenreContext)
    // const { getWorks, works } = useContext(WorkContext)

    const [currentGenre, setCurrentGenre] = useState({
        label: ""
    })

    // useEffect(() => {
    //     getWorks()
    // }, [])

    const { genreId } = useParams()

    useEffect(() => {
        getGenreById(genreId)
            .then((genre) => {
                setCurrentGenre({
                    id: parseInt(genreId),
                    label: genre.label,
                })
            })
    }, [genreId])


    const changeGenreState = (event) => {
        const newGenreState = { ...currentGenre }
        newGenreState[event.target.name] = event.target.value
        setCurrentGenre(newGenreState)
    }

    return (
        <form className="genre">

            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Genre name: </label>
                    <input type="varchar" name="label" required autoFocus className="form-control"
                        value={currentGenre.label}
                        onChange={changeGenreState}
                    />
                </div>
            </fieldset>

            {
                (genreId)
                    ? <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
                            editGenre({
                                id: currentGenre.id,
                                label: currentGenre.label,
                            })
                                .then(() => history.push("/works"))
                        }}
                        className="btn btn-primary">Update</button>

                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const genre = {
                                label: currentGenre.label
                            }

                            createGenre(genre)
                                .then(() => history.push("/works"))
                        }}
                        className="btn btn-primary">Create</button>
            }

            <button type="cancel" onClick={evt => {
                history.goBack()
            }}>cancel</button>

        </form>
    )
}