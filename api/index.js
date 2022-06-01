const consign = require('consign')
const express = require('express')
const app = express()
const port = 3500

app.use(express.json())

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, OPTIONS, POST, PUT, PATCH, DELETE'
  )
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false)
  // Pass to next layer of middleware
  next()
})

consign()
	.include('./libs/config.js')
	.include('./db.js')
	.include('./routes')
	.into(app)

console.log('API running on %s mode', process.env.NODE_ENV)

app.listen(port, () => {
  console.log(`API ready listenning on port ${port}`)
})

if (process.env.NODE_ENV === 'test') module.exports = app
