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
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}))
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
    // console.log(pool);
    // console.log(err);
  } else {
    console.log("CONNECTED TO DATABASE");
  }
})

// -----------SIGN UP-----------
app.post('/signup', (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  req.session.error = ""

  if (firstName == "" || lastName == "" || email == "" || password == "" || confirmPassword == "") {
    console.log("SOME INPUT IS BLANK");
    req.session.error = "Please fill in all fields"
    res.redirect("/signup")
    // res.redirect('/signup')
  } else if (password !== confirmPassword) {
    console.log("PASSWORD DOES NOT MATCH");
    req.session.error = "Passwords do not match"
    res.redirect("/signup")
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log("FAILED TO HASH PASSWORD");
        console.log(err);
        res.redirect('/signup')
      } else {
        pool.connect((err, db) => {
          db.query(
            "SELECT * FROM users where email = $1",
            [email],
            (erro, result) => {
              if (result.rows.length > 0) {
                console.log("EMAIL ALREADY REGISTERED");
                console.log(result);
                req.session.error = "This email has already been registered"
                res.redirect('/signup')
              } else {
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
                      res.redirect("/signin")
                    }
                  }
                )
              }
            }
          )
        })
      }
    })
  }

})

app.get("/signup", (req, res) => {
  // if (req.session.error) {
  // console.log(req.session.error);
  res.send(req.session.error)
  // }
})
// -----------/SIGN UP-----------


// -----------SIGN IN-----------
app.post("/signin", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  req.session.error = ""

  pool.connect((err, db) => {
    db.query(
      'SELECT * FROM users where email = $1',
      [email],
      (err, result) => {
        if (err) {
          console.log("SELECT ERROR");
        }
        if (result.rows.length === 0) {
          console.log("NO USER EXIST FOR THIS EMAIL");
          req.session.error = "No user exist for this email"
          res.redirect("/signin")
        } else {
          bcrypt.compare(password, result.rows[0].password, (error, isMatch) => {
            if (isMatch) {
              const id = result.rows[0].id
              const token = jwt.sign({ id }, process.env.NODE_JWT_SECRET, {
                expiresIn: 300,
              })

              req.session.token = token
              req.session.loggedIn = true
              req.session.firstName = result.rows[0].f_name
              req.session.lastName = result.rows[0].l_name
              req.session.email = result.rows[0].email
              req.session.uid = result.rows[0].id

              res.redirect("/dashboard/" + req.session.uid)
            } else {
              console.log("PASSWORD IS NOT CORRECT");
              req.session.error = "Password is not correct"
              res.redirect("/signin")
            }
          })
        }
      }
    )
  })
})

app.get("/signin", (req, res) => {
  // if (req.session.error) {
  // console.log(req.session.error);
  res.send(req.session.error)
  // }
})
// -----------/SIGN IN-----------


// -----------AUTH-----------
const verifyJWT = (req, res, next) => {
  const token = req.session.token
  console.log("TOKEN(REQ.SESSION.TOKEN): ", token);
  console.log("REQ.SESION: ", req.session);

  if (!token) {
    console.log("TOKEN IS NOT IN SESSION");
    res.redirect('/signin')
  } else {
    jwt.verify(token, process.env.NODE_JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({auth: false, message: "You fauled to authenticate"});
      } else {
        console.log("JWT verified");
        next()
      }
    })
  }
}

// session ==> token, loggedin, firstName, lastName, email,uid
app.get("/auth", verifyJWT ,(req, res) => {
  // if (req.session.loggedIn) {
  if (req.session.token) {
    res.send({
      loggedIn: req.session.loggedIn,
      token: req.session.token,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      email: req.session.email,
      uid: req.session.uid
    })
  }
})
// -----------/AUTH-----------


// -----------/LOGOUT-----------
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("COULD NOT DESTROY SESSION");
    }
    // res.redirect('/signin')
    console.log("REQ.SESSION: ", req.session);
  })
})

// -----------LOGOUT-----------

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, (req, res) => {
  console.log("SERVER IS RUNNING ON ", port);
})