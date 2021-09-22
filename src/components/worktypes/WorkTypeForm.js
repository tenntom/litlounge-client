import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { WorkTypeContext } from "./WorkTypeProvider"


export const WorkTypeForm = () => {

    const history = useHistory()

    const { workTypes, setWorkTypes, getWorkTypes, getWorkTypeById, createWorkType, editWorkType } = useContext(WorkTypeContext)

    const [currentWorkType, setCurrentWorkType] = useState({
        label: ""
    })

    const { workTypeId } = useParams()

    useEffect(() => {
        getWorkTypeById(workTypeId)
            .then((workType) => {
                setCurrentWorkType({
                    id: parseInt(workTypeId),
                    label: workType.label,
                })
            })
    }, [workTypeId])


    const changeWorkTypeState = (event) => {
        const newWorkTypeState = { ...currentWorkType }
        newWorkTypeState[event.target.name] = event.target.value
        setCurrentWorkType(newWorkTypeState)
    }

    return (
        <form className="WorkType">

            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Work Type: </label>
                    <input type="varchar" name="label" required autoFocus className="form-control"
                        value={currentWorkType.label}
                        onChange={changeWorkTypeState}
                    />
                </div>
            </fieldset>

            {
                (workTypeId)
                    ? <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
                            editWorkType({
                                id: currentWorkType.id,
                                label: currentWorkType.label,
                            })
                                .then(() => history.push("/works"))
                        }}
                        className="btn btn-tiny">Update</button>

                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const WorkType = {
                                label: currentWorkType.label
                            }

                            createWorkType(WorkType)
                                .then(() => history.push("/works"))
                        }}
                        className="btn btn-tiny">Create</button>
            }

            <button type="cancel" onClick={evt => {
                history.goBack()
            }} className="btn btn-tiny">cancel</button>
        </form>
    )
}