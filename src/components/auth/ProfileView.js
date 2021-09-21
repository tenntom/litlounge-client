import React, { useEffect, useContext } from "react"
import { ProfileContext } from "./ProfileProvider.js"
import { TalkContext } from "../talk/TalkProvider"
import { useHistory } from 'react-router-dom'
import "./Auth.css"
import "/home/tenntom/workspace/lit-client/src/index.css"


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
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {profile.reader && profile.reader.user.first_name} {profile.reader && profile.reader.user.last_name}
                </div>
                <div className="profile__username">Username: {profile.reader && profile.reader.user.username}</div>
                <div className="profile__bio">About you: {profile.reader && profile.reader.bio}</div>
            </section>
            {/* <div className="user-genres">
                Preferred Genres:
                {
                    profile.reader.genres?.map(g => {
                        return (g.label)
                    }).join(", ")
                }

            </div> */}
            <section className="profile__hosting, talk-section">
                <header className="hosting__header">
                    <h3>Talks: Hosting</h3>
                </header>
                <div className="host-talks">
                    {
                        profile.host_talks?.map(host_talk => {
                            return (
                                <div key={host_talk.id} className="host_talk">
                                    <div className="host_talk_title">Title: {host_talk.title}</div>
                                    <div className="registration_work">Work: {host_talk.work.title}</div>
                                    <div>{host_talk.description}</div>
                                    <div>
                                        {host_talk.date} @ {host_talk.time}
                                    </div>
                                    <div className="talk__edit">
                                        <button className="btn btn-edit-talk btn-tiny" onClick={e => history.push(`/talks/${host_talk.id}/edit`)}>
                                            Edit
                                        </button>
                                    </div>
                                    {/* <div className="talk__delete">
                                        <button className="btn btn-edit-talk btn-tiny" onClick={e => deleteTalk(host_talk.id)}>
                                            Delete
                                        </button>
                                    </div> */}
                                </div>
                        )})
                    }
                </div>
            </section>
            <section className="profile__registrations, talk-section">
                <header className="registrations__header">
                    <h3>Talks: Participating</h3>
                </header>
                <div className="registrations">
                    {
                        profile.talks.map(talk => {
                            return <div key={talk.id} className="registration">
                                <div className="registration_title">Title: {talk.title}</div>
                                <div className="registration_host">Host: {talk.host.user.first_name} {talk.host.user.last_name}</div>
                                <div className="registration_work">Work: {talk.work.title}</div>
                                <div>{talk.description}</div>
                                <div>
                                    {talk.date} @ {talk.time}
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
        </article>
    )
}