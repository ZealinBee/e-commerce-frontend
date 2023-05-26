import React from 'react'
import {Link} from 'react-router-dom'

function NotFoundPage() {
  return (
    <>
    <h1>404 Not Found</h1>
    <Link to="/">Back home</Link>
    </>
  )
}

export default NotFoundPage