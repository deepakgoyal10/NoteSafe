import React,{useEffect } from 'react'
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

const Navbar = () => {
  let location = useLocation();

  let navigate = useNavigate()

  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/login')

  }

 useEffect(() => {
    // This will tell our location in navbar 
    // console.log(location.pathname)
  }, [location]);

  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">noteSAFE</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/home'?'active':''} `} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/about'?'active':''}  `} aria-current="page" to="/about">About</Link>
          </li>

        </ul>

        {/* // here we are saying if localStorage.getItem didn't have token show login and signUp button but if there is token in localstorage then show logout button, method: ternary operator */}
       {!localStorage.getItem("token")? <form className="d-flex" >
        <Link className="btn btn-primary" to="/login" role="button">LogIn</Link>
        <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
        </form>:<button onClick={handleLogout} className='btn btn-primary' >Logout</button>}
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar
