import React from "react"
import { Route } from "react-router-dom"
import { WorkList } from "./work/WorkList.js"
import { WorkProvider } from "./work/WorkProvider.js"
import { TalkProvider } from "./talk/TalkProvider.js"
import { TalkList } from "./talk/TalkList.js"
import { WorkForm } from "./work/WorkForm.js"
import { TalkForm } from "./talk/TalkForm.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"
import { Profile } from "./auth/ProfileView.js"
import { GenreProvider } from "./genres/GenreProvider.js"
import { GenreForm } from "./genres/GenreForm.js"
import { WorkTypeProvider } from "./worktypes/WorkTypeProvider.js"
import { WorkTypeForm } from "./worktypes/WorkTypeForm.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <WorkProvider>
                <TalkProvider>
                    <ProfileProvider>
                        <GenreProvider>
                            <WorkTypeProvider>
                                <Route exact path="/works">
                                    <WorkList />
                                </Route>

                                <Route exact path="/works/new">
                                    <WorkForm />
                                </Route>

                                <Route exact path="/works/:workId(\d+)/edit">
                                    <WorkForm />
                                </Route>

                                <Route exact path="/talks">
                                    <TalkList />
                                </Route>

                                <Route exact path="/talks/new">
                                    <TalkForm />
                                </Route>

                                <Route exact path="/talks/:talkId(\d+)/edit">
                                    <TalkForm />
                                </Route>

                                <Route exact path="/genres/new">
                                    <GenreForm />
                                </Route>

                                <Route exact path="/genres/:genreId(\d+)/edit">
                                    <GenreForm />
                                </Route>

                                <Route exact path="/worktypes/new">
                                    <WorkTypeForm />
                                </Route>

                                <Route exact path="/worktypes/:worktypeId(\d+)/edit">
                                    <WorkTypeForm />
                                </Route>

                                <Route exact path="/profile">
                                    <Profile />
                                </Route>
                            </WorkTypeProvider>
                        </GenreProvider>
                    </ProfileProvider>
                </TalkProvider>
            </WorkProvider>

        </main>
    </>
}