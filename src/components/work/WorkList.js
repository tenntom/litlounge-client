import React, { useContext, useEffect } from "react"
import { WorkContext } from "./WorkProvider.js"
import { useHistory } from 'react-router-dom'


export const WorkList = (props) => {
    const { works, getWorks } = useContext(WorkContext)
    const history = useHistory()


    useEffect(() => {
        getWorks()
    }, [])

    return (
        <article className="works">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/works/new" })
                }}
            >Register New Work</button>
            {
                works.map(work => {
                    return <section key={`work--${work.id}`} className="work">
                        <div className="work__edit">
                        <button className="btn btn-3 btn-tiny" onClick={e => history.push(`/works/${work.id}/edit`)}>
                            Edit                        
                        </button>
                        </div>
                        <div className="work__title">{work.title} by {work.author}</div>
                        <div className="Work__description">Work Description: {work.description}</div>
                        <div className="Work__type">Work Type: {work.work_type.label}</div>   
                        <div className="Work__identifier">Work Identifier: {work.identifier}</div>
                        <div className="Work__urllink">URL Link: {work.url_link}</div>   
                        <div className="Work__urllink">Posted by: {work.posted_by.user.first_name}</div>
                    </section>
                })
            }
        </article>
    )
}