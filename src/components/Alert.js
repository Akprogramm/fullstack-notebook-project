import React from 'react'

export default function Alert(props) {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
  A simple primary alert with <a href="/" className="alert-link">{props.message}</a>. Give it a click if you like.
</div>
    </div>
  )
}
