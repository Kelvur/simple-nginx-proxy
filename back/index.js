const express = require('express');

const app = express();

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(express.json())
app.use('/', function(request, response) {
    const message = `Request made to ${request.path} with the HTTP method ${request.method} and the body:\n${JSON.stringify(request.body || {})}\n`
    console.log(message);
    response.send(message);
});

app.listen(PORT);
