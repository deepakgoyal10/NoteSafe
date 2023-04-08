import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  // using state for credentials
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  // We use navigate to redirect the a path 
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    // destructoring from the credentials
    const { name, email, password } = credentials

    // hitting the api
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      // setting up the header
      headers: {
        "Content-Type": "application/json"

      },
      // stringyfy the credentials for body(this will convert object into the string )
      body: JSON.stringify({ name, email, password })

    })
    const json = await response.json()
    console.log(json)
    if (json.success) {
      // save the auth-token and redirect
      localStorage.setItem('token', json.authToken)
      props.showAlert("account created successfully", "success")
      navigate("/")
    }
    else {
      props.showAlert("Invalid Details", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className='container'>
      <h2> Create an account to use iNotebook</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup