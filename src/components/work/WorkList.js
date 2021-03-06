import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../auth/ProfileProvider"
import { WorkContext } from "./WorkProvider.js"
import { WorkSearch } from "./WorkSearch.js"
import { useHistory, Link } from 'react-router-dom'
import { ExternalLink } from "react-external-link"
import "./Work.css"


export const WorkList = (props) => {
    const { works, getWorks, workSearch } = useContext(WorkContext)
    const { profile, getProfile } = useContext(ProfileContext)
    const history = useHistory()
    const currentUsername = localStorage.getItem("ll_username")
    const [filteredWorks, setFilteredWorks] = useState([])


    useEffect(() => {
        getWorks()
    }, [])

    useEffect(() => {
        if (workSearch !== "") {
            const workSubset = works.filter(w => w.title.toLowerCase().includes(workSearch) || w.author.toLowerCase().includes(workSearch) || w.work_type.label.toLowerCase().includes(workSearch) || w.description.toLowerCase().includes(workSearch))
            setFilteredWorks(workSubset)
        } else {
            setFilteredWorks(works)
        }
    }, [workSearch, works])

    return (
        <article className="works">
            <header className="works__header">
                <h1>Lit Lounge Works</h1>
            </header>
            <div className="page-top">
                <button className="btn btn-top"
                    onClick={() => {
                        history.push({ pathname: "/works/new" })
                    }}
                >Add New Work</button>

                <WorkSearch />
            </div>

            <div className="work-list">

                {
                    filteredWorks.map(work => {
                        return <section key={`work--${work.id}`} className="work">
                            <div className="work__title">{work.title}</div>
                            <div className="work__author">By {work.author}</div>
                            <div className="Work__description">Description: {work.description}</div>
                            <div className="Work__type">Type: {work.work_type.label}</div>
                            <div className="Work__identifier">Identifier: {work.identifier}</div>
                            <div className="Work__urllink"><ExternalLink className="url_link" href={work.url_link}>External Link</ExternalLink></div>
                            <div className="participants">
                                Genres:{" "}
                                {
                                    work.genres.map(g => {
                                        return (g.label)
                                    }).join(", ")
                                }

                            </div>
                            <div className="Work__urllink">Posted by: {work.posted_by.user.first_name}</div>
                            <div className="work__edit">
                                {
                                    work.posted_by.user.username === currentUsername
                                        ? <button className="btn btn-tiny btn-work" onClick={e => history.push(`/works/${work.id}/edit`)}>Edit</button>
                                        : <div></div>
                                }
                            </div>
                        </section>
                    })
                }
            </div>
        </article>
    )
}