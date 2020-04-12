const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://cuhauw:${password}@cluster0-f3gte.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name:String, 
    number: String
})

const Person = mongoose.model('person', personSchema)    


if (name && number) {
    
    const person = new Person({
        name: name,
        number: number
    })
    
    person.save().then(response => {
      console.log('person saved!')
      mongoose.connection.close()
    })

} else {

    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
}