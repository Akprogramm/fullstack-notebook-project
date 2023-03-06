import React from 'react'
import { useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom'

export default function Navbar() {
  let location=useLocation();

  useEffect(()=>{
 console.log("Location is : ",location.pathname);
  },[location])


  return (
    <div>

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      <form className='d-flex'>
      <Link className='btn btn-primary mx-2' to='/login' role="button">Login</Link>
      <Link className='btn btn-primary mx-2' to='/signup' role="button">SignUp</Link> 
      </form>
    </div>
  </div>
</nav>


    </div>
  )
}
