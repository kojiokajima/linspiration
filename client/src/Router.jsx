import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Home, SignUp, SignIn} from './components/index'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
    </Switch>
  )
}

export default Router