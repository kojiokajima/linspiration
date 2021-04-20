import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import {Button, Textarea, Row, Col, CardPanel} from 'react-materialize'

const Dashboard = () => {
  const [firstName, setFirstName] = useState("")
  const [sessionExpired, setSessionExpired] = useState(false)
  const [posts, setPosts] = useState([])
  
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
      } else {
        localStorage.clear()
        setSessionExpired(true)
      }
    })

    axios.get('/getpost').then(response => {
      console.log("GETPOST EVOKED");
      const data = response.data;
      console.log("DATA IS ", data);
      if (data.length > 0) {
        setPosts(data)
      }
    })
  }, [])


  if (!sessionExpired) {
    return (
      <div className="dashboard">
        <h3>Hello {firstName}</h3>
      <br/>
        {
          posts.map((post) => (
            <Col
              m={6}
              s={12}
            >
              <CardPanel key={post.id} className="teal">
                <span className="white-text">
                  {post.content}
                </span>
              </CardPanel>
            </Col>
          ))
        }
      <br/>
      <div className="post-form">
        <form action="/post" method="POST">
          {/* <Row> */}
          <Textarea id="post-form" name="ideaContent" placeholder="What is your idea?" />
          <Button node="button"  waves="light" >POST</Button>
          {/* </Row> */}
        </form>
      </div>
      <br/>
      <Link to="/signin">
        <Button waves="light" onClick={logout} >Logout</Button>
      </Link>
      </div>
    )
  } else {
    return <Redirect to="/signin" />
  }
}

export default Dashboard
