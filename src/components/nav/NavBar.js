import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to="/talks">Talks</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/works">Works</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            {
                (localStorage.getItem("ll_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("ll_token")
                                localStorage.removeItem("ll_username")
                                history.push("/")
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
