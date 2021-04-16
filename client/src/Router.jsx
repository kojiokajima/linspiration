import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Home, SignUp} from './components/index'

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={SignUp} />
    </Switch>
  )
}

export default Router