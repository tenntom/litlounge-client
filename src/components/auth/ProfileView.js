import React, { useEffect, useContext } from "react"
import { ProfileContext } from "./ProfileProvider.js"
import "./Auth.css"
import "/home/tenntom/workspace/lit-client/src/index.css"


export const Profile = () => {
    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
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
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Your Talks</h3>
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