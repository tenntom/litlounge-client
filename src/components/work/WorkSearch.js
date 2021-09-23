import React, { useContext } from "react"
import { WorkContext } from "./WorkProvider"
import "./Work.css"

export const WorkSearch = () => {
    const { setWorkSearch } = useContext(WorkContext)

    return (
        <>
            <input type="text"
                className="input--wide"
                onKeyUp={(event) => setWorkSearch(event.target.value.toLowerCase())}
                placeholder="Search Works..." />
        </>
    )
}
