import React, { useContext, useEffect } from "react"
import { WorkContext } from "./WorkProvider.js"
import { ProfileContext } from "../auth/ProfileProvider"
import { useHistory, Link } from 'react-router-dom'
import { ExternalLink } from "react-external-link"


export const WorkList = (props) => {
    const { works, getWorks } = useContext(WorkContext)
    const { profile, getProfile } = useContext(ProfileContext)
    const history = useHistory()
    const currentUsername = localStorage.getItem("ll_username")


    useEffect(() => {
        getWorks()
    }, [])

    return (
        <article className="works">
            <button className="btn btn-2 btn-sep"
                onClick={() => {
                    history.push({ pathname: "/works/new" })
                }}
            >Add New Work</button>
            {
                works.map(work => {
                    return <section key={`work--${work.id}`} className="work">
                        <div className="work__title">{work.title} by {work.author}</div>
                        <div className="Work__description">Work Description: {work.description}</div>
                        <div className="Work__type">Work Type: {work.work_type.label}</div>
                        <div className="Work__identifier">Work Identifier: {work.identifier}</div>
                        <div className="Work__urllink"><ExternalLink className="url_link" href={ work.url_link }>External Link</ExternalLink></div>
                        <div className="participants">
                            Genres:{" "} 
                            {
                                work.genres.map(g => {
                                   return(g.label)
                                }).join(", ")
                            }
                             
                        </div>
                        <div className="Work__urllink">Posted by: {work.posted_by.user.first_name}</div>
                        <div className="work__edit">
                            {
                                work.posted_by.user.username === currentUsername
                                    ? <button className="btn btn-3 btn-tiny" onClick={e => history.push(`/works/${work.id}/edit`)}>Edit</button>
                                    : <div></div>
                            }
                        </div>
                    </section>
                })
            }
        </article>
    )
}