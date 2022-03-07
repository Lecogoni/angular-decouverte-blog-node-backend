const express = require('express')
const app = express()
var cors = require('cors')


// import json datas
const articles = require('./articles.json')

// Middleware 
app.use(express.json())
app.use(cors())



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



app.post('/articles', (req,res) => {
  parkings.push(req.body)
  res.status(200).json(parkings)
})

app.listen(8080, () => {
  console.log('runnig at http://localhost:8080')
})