import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TalkContext } from "./TalkProvider"
import { WorkContext } from "../work/WorkProvider"


export const TalkForm = () => {

    const history = useHistory()

    const { createTalk } = useContext(TalkContext)
    const { getWorks, works } = useContext(WorkContext)

    const [currentTalk, setTalk] = useState({
        hostId: 0,
        workId: 0,
        date: 0,
        time: 0,
        title: "",
        description: "",
        supMaterials: "",
        zoomMeetingId:"",
        zoomMeetingPassword: "",
        participantIds: []
    })

    useEffect(() => {
        getWorks()
    }, [])


    const changeTalkState = (event) => {
        const newTalkState = { ...currentTalk }
        newTalkState[event.target.name] = event.target.value
        setTalk(newTalkState)
    }


    return (
        <form className="Talk">
            <h2 className="Talk_title">Schedule New Talk</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="workId">Work: </label>
                    <select name="workId" className="form-control"
                        value={currentTalk.workId}
                        onChange={changeTalkState}>
                        <option value="0">Select a Work...</option>
                        {
                            works.map(work => (
                                <option key={work.id} value={work.id}>{work.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="varchar" name="title" required autoFocus className="form-control"
                        value={currentTalk.title}
                        onChange={changeTalkState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date ">Date: </label>
                    <input type="date" name="date" required autoFocus date className="form-control"
                        value={currentTalk.date}
                        onChange={changeTalkState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Time: </label>
                    <input type="time" name="time" required autoFocus time className="form-control"
                        value={currentTalk.time}
                        onChange={changeTalkState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentTalk.description}
                        onChange={changeTalkState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="sup_materials">Supplimentary Materials: </label>
                    <input type="text" name="supMaterials" required autoFocus className="form-control"
                        value={currentTalk.supMaterials}
                        onChange={changeTalkState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="zoomMeetingId">Zoom Meeting Id: </label>
                    <input type="text" name="zoomMeetingId" required autoFocus className="form-control"
                        value={currentTalk.zoomMeetingId}
                        onChange={changeTalkState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="zoomMeetingPassword">Meeting Password: </label>
                    <input type="text" name="zoomMeetingPassword" required autoFocus className="form-control"
                        value={currentTalk.zoomMeetingPassword}
                        onChange={changeTalkState}
                    />
                </div>
            </fieldset>



            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const talk = {
                        hostId: parseInt(currentTalk.hostId),
                        workId: parseInt(currentTalk.workId),
                        title: currentTalk.title,
                        date: currentTalk.date,
                        time: currentTalk.time,
                        description: currentTalk.description,
                        supMaterials: currentTalk.supMaterials,
                        zoomMeetingId: currentTalk.zoomMeetingId,
                        zoomMeetingPassword: currentTalk.zoomMeetingPassword
                    }

                    createTalk(talk)
                    .then(() => history.push("/talks"))
                }}

                className="btn btn-primary">Create Talk</button>

        </form>
    )
}