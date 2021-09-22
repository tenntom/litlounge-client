import React, { useEffect, useContext } from "react"
import { ProfileContext } from "./ProfileProvider.js"
import { TalkContext } from "../talk/TalkProvider"
import { useHistory } from 'react-router-dom'
import "./Auth.css"
import "/home/tenntom/workspace/lit-client/src/index.css"
import { ExternalLink } from "react-external-link"


export const Profile = () => {
    const { profile, getProfile } = useContext(ProfileContext)
    const { deleteTalk } = useContext(TalkContext)
    const history = useHistory()

    useEffect(() => {
        getProfile()
            .then(() => {
                console.log(profile.host_talks)
            })
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <div className="profile__name profile-line">
                    Welcome to the LitLounge, {profile.reader && profile.reader.user.first_name}!
                </div>
                <div className="profile__username profile-line">Your username: {profile.reader && profile.reader.user.username}</div>
                <div className="profile__bio profile-line">About you: {profile.reader && profile.reader.bio}</div>
                {/* <div className="user-genres">
                Preferred Genres:
                {
                    profile.reader.genres?.map(g => {
                        return (g.label)
                    }).join(", ")
                }
                </div> */}
            </section>
            
            <section className="profile__hosting, talk-section">
                <header className="hosting__header">
                    <h2>Talks: Hosting</h2>
                </header>
                <div className="host-talks talk-list">
                    {
                        profile.host_talks?.map(host_talk => {
                            return (
                                <div key={host_talk.id} className="host_talk">
                                    <div className="host_talk_title talk_title">Title: {host_talk.title}</div>
                                    <div className="registration_work">Work: {host_talk.work.title}</div>
                                    <div className="registration_work">Link: {host_talk.work.url_link}</div>
                                    {/* <div className="Work__urllink"><ExternalLink className="url_link" href={ host_talk.work.url_link }>External Link</ExternalLink></div> */}
                                    <div>{host_talk.description}</div>
                                    <div>
                                        {host_talk.date} @ {host_talk.time}
                                    </div>
                                    <div className="profile-section profile-add-materials">
                                        Additional Materials:{host_talk.sup_materials}
                                    </div>
                                    <div className="profile-section zoom-field">
                                        Mtg Id:{host_talk.zoom_meeting_id}
                                    </div>
                                    <div className="profile-section zoom-field">
                                        Password:{host_talk.zoom_meeting_password}
                                    </div>
                                    <div className="talk__edit">
                                        <button className="btn-edit-talk" onClick={e => history.push(`/talks/${host_talk.id}/edit`)}>
                                            Edit
                                        </button>
                                    </div>
                                    {/* <div className="talk__delete">
                                        <button className="btn btn-edit-talk btn-tiny" onClick={e => deleteTalk(host_talk.id)}>
                                            Delete
                                        </button>
                                    </div> */}
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section className="profile__registrations, talk-section">
                <header className="registrations__header">
                    <h2>Talks: Participating</h2>
                </header>
                <div className="registrations talk-list">
                    {
                        profile.talks.map(talk => {
                            return <div key={talk.id} className="registration">
                                <div className="profile_title profile-section talk_title">{talk.title}</div>
                                <div className="profile-section profile_host">Host: {talk.host.user.first_name} {talk.host.user.last_name}</div>
                                <div className="profile-work profile-section">Work: {talk.work.title} by {talk.work.author}</div>
                                <div className="profile-urllink profile-section"><ExternalLink className="url_link" href={ talk.work.url_link }>External Link</ExternalLink></div>
                                <div className="profile-section profile-description">{talk.description}</div>
                                <div>
                                    {talk.date} @ {talk.time}
                                </div>
                                <div className="profile-sup-materials, profile-section"><ExternalLink className="url_link" href={ talk.sup_materials}>Additional Materials</ExternalLink></div>
                                <div className="profile-section zoom-field">
                                    Mtg Id:{talk.zoom_meeting_id}
                                </div>
                                <div className="profile-section zoom-field">
                                    Password:{talk.zoom_meeting_password}
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
        </article>
    )
}