const express = require('express')
const app = express()
// const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

// morgan.token('ret_string', function (req, res) { 
//     var ret_string = JSON.stringify([req.body.name, req.body.number])
//     return ret_string
// })

// app.use(morgan(':method :url :response-time :ret_string'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    res.json(person)
})

app.get('/info', (req, res) => {
    res.send(
        `<p> Phonebook has info for ${persons[0]['persons'].length} people </p>`
    )
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {

    const name = req.body.name
    const number = req.body.number

    if (!name) {
        return res.states(400).json({ error: 'name missing' })
    } else if (!number) {
        return res.states(400).json({ error: "number missing" })
    }

    const person = {
        name: name,
        num: number,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
