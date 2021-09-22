import React, { useContext, useEffect } from "react"
import { TalkContext } from "./TalkProvider.js"
import { useHistory, Link } from "react-router-dom"
import "./Talk.css"
import "/home/tenntom/workspace/lit-client/src/index.css"

export const TalkList = (props) => {
    const { talks, getTalks, joinTalk, leaveTalk } = useContext(TalkContext)
    const history = useHistory()

    useEffect(() => {
        getTalks()
    }, [])

    return (
        <article className="talks">
            <header className="talks__header">
                <h1>Lit Lounge Talks</h1>
            </header>
            <div className="new_talk">
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/talks/new" })
                    }}>Add New Talk</button>
            </div>
            {
                talks.map(talk => {
                    return <section key={talk.id} className="talk">
                        <div className="talk_title">Topic: {talk.title}</div>
                        <div className="work_title">Work:{talk.work.title}</div>
                        <div className="work_author">Author: {talk.work.author}</div>
                        <div className="work_description">Description: {talk.description}</div>
                        <div>Host: {talk.host.user.first_name} {talk.host.user.last_name}</div>
                        <div>
                            {
                                new Date(talk.date).toLocaleDateString("en-US",
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                            }
                            @ {talk.time}
                        </div>
                        <div className="participants">
                            Current Participants:{" "} 
                            {
                                talk.participants.map(participant => {
                                   return(participant.user.first_name)
                                }).join(", ")
                            }
                             
                        </div>
                        <div className="talk-joined-btns">
                        {
                            talk.joined
                                ?<button className="btn btn-3" onClick={() => leaveTalk(talk.id)}>Leave</button>
                                :<button className="btn btn-2" onClick={() => joinTalk(talk.id)}>Join</button>
                        }
                        </div>
                    </section>
                })
            }
        </article >
    )
}