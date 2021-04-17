import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Button} from 'react-materialize'

const Dashboard = () => {
  const [firstName, setFirstName] = useState("")

  const logout = () => {
    localStorage.clear()
    localStorage.setItem("loggedIn", false)
    axios.post('/logout')
  }

  useEffect(() => {
    axios.get('/auth').then((response) => {
      if (response.data.loggedIn) {
        // session ==> token, loggedin, firstName, lastName, email,uid
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("loggedIn", response.data.loggedIn)
        localStorage.setItem("firstName", response.data.firstName)
        localStorage.setItem("lastName", response.data.lastName)
        localStorage.setItem("email", response.data.email)
        localStorage.setItem("uid", response.data.uid)
        setFirstName(localStorage.getItem("firstName"))
      }
    })
  }, [])

  return (
    <div>
      <h3>Hello {firstName}</h3>
    <br/>
    {/* <Button type="submit" waves="light" onClick={logout}>Logout</Button> */}
    <Link to="/signin">
      <Button waves="light" onClick={logout} >Logout</Button>
    </Link>
    </div>
  )
}

export default Dashboard
