const express = require('express')
const knex = require('knex')(require('./knexfile.js')['development'])
var cors = require('cors')

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    knex('movies').select('*')
        .then(data => res.send(data))
})

app.listen(port, () => console.log(`Express is listening on port ${port}`))