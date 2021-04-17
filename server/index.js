const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const { Pool } = require("pg")


const port = process.eventNames.PORT || 3050
const app = express()
require("dotenv").config()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/build')))
// app.use(cors({
//   origin: ["http://localhost:3000"],
//   methods: ["GET", "POST"],
//   credentials: true,
// }))
app.use(session({
  key: "token",
  secret: process.env.NODE_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 // --> 1 min for now
  },
}))

const pool = new Pool({
  connectionString: process.env.NODE_HEROKU_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

pool.connect((err, res) => {
  if (err) {
    console.log("FAILED TO CONNECT TO DATABASE");
    console.log(pool);
    console.log(err);
  } else {
    console.log("CONNECTED TO DATABASE");
  }
})

app.post('/signup', (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword

  if (firstName == "" || lastName == "" || email == "" || password == "" || confirmPassword == "") {
    res.redirect("http://localhost:3000/signup")
    // res.redirect('/signup')
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log("FAILED TO HASH PASSWORD");
        console.log(err);
        res.redirect('/signup')
      } else {
        pool.connect((err, db) => {
          db.query(
            "INSERT INTO users (f_name, l_name, email, password) VALUES ($1, $2, $3, $4)",
            [firstName, lastName, email, hash],
            (error, results) => {
              if (error) {
                console.log("FAILED TO INSERT USER");
                console.log(error);
                res.redirect("/signup")
              } else {
                console.log("USER ADDED");
                // res.redirect("http://localhost:3000/signin")
                res.redirect("/signin")
              }
            }
          )
        })
      }
    })
  }

})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, (req, res) => {
  console.log("SERVER IS RUNNING ON ", port);
})