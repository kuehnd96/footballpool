import React from 'react'
import {Link} from "react-router-dom"

export default function Error() {
    return (
        <>
        <h1>404</h1>
        <h3>page not found</h3>
        <Link to="/">
          return home
        </Link>
        </>
    )
}