const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');

/* INITIALISATION ZONE
---------------------------------------------------- */

const PORT = 8080
//JWT token lifetime
const jwtExpirySeconds = 3000

/* IMPORT JSON DATA
---------------------------------------------------- */
const articles = require('./articles.json')
const users = require('./users.json')


/* MIDDLEWARE
---------------------------------------------------- */
app.use(express.json())
app.use(cors())

// function myLogger (req, res, next) {
//   console.log('LOGGED');
//   next();
// };
// const myLogger = require('myLogger')

// app.use(myLogger())


var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 
}


//cors(corsOptions), 
/**
 * GET all articles - /api/articles
 * This routes send all articles datas on json format
 */
app.get('/api/articles', (req,res) => {
  //res.header('Access-Control-Allow-Origin', 'http://example.com');
  res.status(200).json(articles);
})


/**
 * GET on articles - find by id params - /api/article/:id
 * find in articles the one with the id received in params
 * send the article find
 */
app.get('/api/article/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(article => article.id === id);
  res.status(200).json(article);
})


/** 
 * check if user params match with a user present in hard coding db - json file
 * if yes send a json response with the user name and a jwt - set the jwt in the response header
 */
app.get('/api/loggin', (req,res) => {
  const email = req.query.email;
  const password = req.query.password;
  if(!userExist(email)){
    res.status(404).send('user not found')
  } else {
    const token = generateJWT(email);
    //res.set('authorization', 'Bearer' + token)
    res.setHeader({isLog: true});
    res.status(200).json({
        isLog: true,
        msg: 'you are loggin',
        token: token
        });
  }
})


app.get('/api/check', (req, res) => {
  const token = req.query.token;
  payload = jwt.verify(token, process.env.TOKEN_SECRET)
  res.status(200).send(payload.user)
})



/* SERVER LISTENING PORT
---------------------------------------------------- */

app.listen(PORT, () => {
  console.log(`runnig at http://localhost:${PORT}`)
})



/* FUNCTION
---------------------------------------------------- */

/**
 * return true if a email (key email) present in json files match the user param
 */
function userExist(email){
  return users.some(function(el) {
    return el.email === email;
  }); 
}

/**
 * return a JWT generated based a secret key in dotenv and user name receive in params
 */
function generateJWT(email){
  const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  })
  return token;
}




// res.status(200).json(
//   
// )