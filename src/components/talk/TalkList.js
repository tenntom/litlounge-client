import React, { useContext, useEffect, useState } from "react"
import { TalkContext } from "./TalkProvider.js"
import { TalkSearch } from "./TalkSearch.js"
import { useHistory, Link } from "react-router-dom"
import "./Talk.css"
import "/home/tenntom/workspace/lit-client/src/index.css"

export const TalkList = (props) => {
    const { talks, getTalks, joinTalk, leaveTalk, searchTerms } = useContext(TalkContext)
    const [currentTalks, setCurrentTalks] = useState([])
    const [filteredTalks, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        getTalks()
    }, [])

    useEffect(() => {
        let today = new Date()
        const theseActiveTalks = talks.filter(talk => new Date(talk.date) >= today)
        const theseSortedTalks = theseActiveTalks.sort((a, b) => new Date(a.date) - new Date(b.date))
        setCurrentTalks(theseSortedTalks)
    }, [talks])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = currentTalks.filter(t => t.title.toLowerCase().includes(searchTerms) || t.work.title.toLowerCase().includes(searchTerms) || t.description.toLowerCase().includes(searchTerms) || t.work.author.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(currentTalks)
        }
    }, [searchTerms, currentTalks])

    return (
        <article className="talks">
            <header className="talks__header">
                <h1>Lit Lounge Talks</h1>
            </header>
            <div className="page-top">
                    <button className="btn btn-top"
                        onClick={() => {
                            history.push({ pathname: "/talks/new" })
                        }}>Add New Talk</button>
                    <TalkSearch className="talk-search"/>
            </div>
            <div className="talk-list">
                {
                    filteredTalks.map(talk => {
                        return <section key={talk.id} className="talk">
                            <div className="talk_title">{talk.title}</div>
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
                                @{talk.time}
                            </div>
                            <div className="participants">
                                Participants:{" "}
                                {
                                    talk.participants.map(participant => {
                                        return (participant.user.first_name)
                                    }).join(", ")
                                }

                            </div>
                            <div className="talk-joined-btns">
                                {
                                    talk.joined
                                        ? <button className="btn-low btn-leave" onClick={() => leaveTalk(talk.id)}>Leave</button>
                                        : <button className="btn-low btn-join" onClick={() => joinTalk(talk.id)}>Join</button>
                                }
                            </div>
                        </section>
                    })
                }</div>
        </article >
    )
}