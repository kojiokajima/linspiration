import React from 'react'
import {Link} from  'react-router-dom'
import {Button} from 'react-materialize'

const Home = () => {
  return (
    <div>
      <h1>This is home</h1>
      <br/><br/>
      <Link to="/signin">
        <Button type="submit" waves="light">Login</Button>
      </Link>
      <br/><br/>
      <Link to="/signup">
        <Button type="submit" waves="light">Signup</Button>
      </Link>

    </div>
  )
}

export default Home
