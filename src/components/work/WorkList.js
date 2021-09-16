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
                        <button className="btn btn-3" onClick={e => history.push(`/works/${work.id}/edit`)}>
                            Edit                        
                        </button>
                        </div>
                        <div className="work__title">{work.title} by {work.author}</div>
                        <div className="Work__description">Work Description: {work.description}</div>
                        <div className="Work__type">Work Type: {work.work_type.label}</div>   
                    </section>
                })
            }
        </article>
    )
}