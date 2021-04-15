const express = require("express")
const cors = require("cors")
const bcrypt = require("cors")
const jwt = require("jsonwebtoken")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const {Pool} = require("pg")

const port = process.eventNames.PORT || 3001
const app = express()
require("dotenv")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(cors({
  origin: ("http://localhost:3000"),
  methods: ("GET", "POST"),
  credentials: true
}))
app.use(session({
  key: "token",
  secret: process.env.NODE_SESSION_DECRET,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 // --> 1 min for now
  },
}))

// const pool = new Pool({
//   connectionString: 
// })