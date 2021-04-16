import React from "react";
import { TextInput, Button, Icon } from "react-materialize";
import styled from 'styled-components'
import Hero from '../assets/images/dog01.jpg'
import axios from 'axios'
import {Link} from 'react-router-dom'

// const SignUpContainer = styled.div`
//   margin: 2rem;
// `

const SignUp = () => {
  axios.defaults.withCredentials = true


  return (
    <div className="signup">
      <div className="signup-hero">
        <img src={Hero} alt="" />
        {/* some image */}
      </div>
      <form className="signup-form" action="/signup" method="POST">
        <label htmlFor="">Name</label>
        <TextInput id="firstName" icon="person_outline" label="First Name" name="firstName" />
        <TextInput id="lastName" icon="person_outline" label="Last Name" name="lastName" />
        <br/>
        <label htmlFor="">Email</label>
        <TextInput id="email" icon="email" label="Email" name="email" email={true} email={true} />
        <br/>
        <label htmlFor="">Password</label>
        <TextInput id="password" icon="vpn_key" label="Password" name="password" password={true} />
        <TextInput id="confirm-password" icon="vpn_key" label="Confirm Password" name="confirmPassword" password={true} />
        <br/><br/><br/>
        <Button type="submit" waves="light">Register<Icon right >send</Icon></Button>
        <br/><br/>
        <Link to="/signin">already have an accoun?</Link>
      </form>
    </div>
  );
};

export default SignUp;
