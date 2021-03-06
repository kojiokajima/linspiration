import React, { useEffect, useState } from 'react'
import Hero from '../assets/images/hero01.JPG'
import {TextInput, Button, Icon} from 'react-materialize'
import {Link} from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
  console.log("SIGNIN RENDERED");
  const [error, setError]  = useState("")


  useEffect(() => {
    console.log("USE EFFECT IN SIGNIN EVOKED");
    axios.get('/signin').then((response) => {
      if (response.data.length < 50) {
        console.log(response);
        setError(response.data)
      }
    })
  }, [])

  return (
    <div className="signin">
      <div className="signin-hero">
        <img src={Hero} alt="" />
        {/* some image */}
      </div>
    <div className="signin-form">
      <form action="/signin" method="POST">
        <div className="error-message">{error}</div>
      {/* <form className="signin-form" action="http://localhost:3001/signin" method="POST"> */}
        <label htmlFor="">Email</label>
        <TextInput id="email" icon="email" label="Email" name="email" />
        <br/>
        <label htmlFor="">Password</label>
        <TextInput id="password" icon="vpn_key" label="Password" name="password" />
        <br/><br/><br/>
        <Button type="submit" waves="light">Login<Icon right >send</Icon></Button>
        <br/><br/>
        <Link to="/signup">
          don't have an account?
        </Link>
      </form>
    </div>

    </div>
  )
}

export default SignIn
