import React, { useEffect, useState } from 'react'
import Hero from '../assets/images/dog01.jpg'
import {TextInput, Button, Icon} from 'react-materialize'
import {Link} from 'react-router-dom'

const SignIn = () => {
  console.log("SIGNIN RENDERED");
  const [error, setError]  = useState("")


  useEffect(() => {
    console.log("USE EFFECT IN SIGNIN EVOKED");
  }, [])


  return (
    <div className="signin">
      <div className="signin-hero">
        <img src={Hero} alt="" />
        {/* some image */}
      </div>
      <form className="signin-form" action="/signin" method="POST">
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
  )
}

export default SignIn
