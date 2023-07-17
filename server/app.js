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

app.get('/:title' , (req, res) => {
    knex('movies').select('*').where({title: req.params.title})
        .then(data => res.send(data))
})

app.post('/', async (req, res) => {
    const body = req.body
    try {
        const movie = await knex('movies').insert(body)
        res.status(201).send(movie)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete('/:title', (req, res) => {
    knex('movies').where({title: req.params.title}).del()
        .then(() => res.json('Deleted successfully'))
})

app.patch('/:title', (req, res) => {
    knex('movies').where({title: req.params.title}).update(req.body).returning('*')
        .then(res.send('Updated successfully'))
})

app.listen(port, () => console.log(`Express is listening on port ${port}`))