import React from 'react'
import Hero from '../assets/images/dog01.jpg'
import {TextInput, Button, Icon} from 'react-materialize'
import {Link} from 'react-router-dom'

const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin-hero">
        <img src={Hero} alt="" />
        {/* some image */}
      </div>
      <form className="signin-form" action="/signin" method="POST">
      {/* <form className="signin-form" action="http://localhost:3001/signin" method="POST"> */}
        <label htmlFor="">Email</label>
        <TextInput id="email" icon="email" label="Email" name="email" email={true}  />
        <br/>
        <label htmlFor="">Password</label>
        <TextInput id="password" icon="vpn_key" label="Password" name="password" password={true} />
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
