import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/navbar"
import { Login } from "./auth/login"
import { Register } from "./auth/register"

export const LitLounge = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("ll_token")) {
                return <>
                    <Route render={NavBar} />
                    <Route render={props => <ApplicationViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login">
            <Login />
        </Route>

        <Route path="/register">
            <Register />
        </Route>
    </>
)


// export const LitLounge = () => {

//     if (localStorage.getItem("ll_token")) {
//         return
//         <>
//             <NavBar />
//             <ApplicationViews />
//         </>
//     } else {
//         return <Redirect to="/login" />
//     }

// }
