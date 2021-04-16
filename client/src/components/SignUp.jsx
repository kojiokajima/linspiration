import React from "react";
import { TextInput, Button, Icon } from "react-materialize";

import '../assets/styles/main.scss'

const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup-hero">
        some image
      </div>
      <form className="signup-form" action="/signup" method="POST">
        <label htmlFor="">Name</label>
        <TextInput id="firstName" icon="person_outline" label="First Name" name="firstName" />
        <TextInput id="lastName" icon="person_outline" label="Last Name" name="lastName" />
        <label htmlFor="">Email</label>
        <TextInput id="email" icon="email" label="Email" name="email" email={true}  />
        <label htmlFor="">Password</label>
        <TextInput id="password" icon="vpn_key" label="Password" name="password" password={true} />
        <TextInput id="confirm-password" icon="vpn_key" label="Confirm Password" name="confirmPassword" password={true} />
        <br/><br/>
        <Button type="submit" waves="light">Register<Icon right >send</Icon></Button>
      </form>
    </div>
  );
};

export default SignUp;
