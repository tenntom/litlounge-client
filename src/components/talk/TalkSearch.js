import React, { useContext } from "react"
import { TalkContext } from "./TalkProvider"
import "./Talk.css"

export const TalkSearch = () => {
    const { setSearchTerms } = useContext(TalkContext)

    return (
        <>
            <input type="text"
                className="input--wide"
                onKeyUp={(event) => setSearchTerms(event.target.value.toLowerCase())}
                placeholder="Search Talks..." />
        </>
    )
}
