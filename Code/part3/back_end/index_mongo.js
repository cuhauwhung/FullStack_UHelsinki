require('dotenv').config('./.env')

const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const Person = require('./models/person')

// Mongo routes 
app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        res.json(person.toJSON())
    })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {

    const name = req.body.name
    const number = req.body.number

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
        .catch(error => {
            next(error)
        })
})

app.put('/api/persons/:id', (req, res, next) => {

    const number = req.body.number
    const person = {
        number: number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => {
            next(error)
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(person => {
            if (person) {
                res.status(204).end()
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {

    console.error(error.message)
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
