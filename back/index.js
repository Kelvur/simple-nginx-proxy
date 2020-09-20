// Core
const express = require('express')
// Data
const original_users = require('./users.json')


const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT

// Start App
const app = express()

// Handle header Content-Type: application/json
app.use(express.json())

// Log all the request
app.use('/', function(request, _, next) {
    const message = `Request made to ${request.path} with the HTTP method ${request.method} and the body:\n${JSON.stringify(request.body || {})}\n`
    console.log(message)
    next()
})

// Users
let users =  [...original_users.data]

app.get('/users', function(_, response) {
    response.status(200).send(users)
})
app.post('/users', function(request, response) {
    const newUser = request.body

    users = [...users, {name: newUser.name, book: newUser.book}]

    response.status(200).send(users)
})

app.use(express.static('statics'))

app.listen(PORT)
