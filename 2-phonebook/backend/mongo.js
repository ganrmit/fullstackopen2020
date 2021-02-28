const mongoose = require('mongoose')

// Guard for incorrect usage
if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log('---Usage---\nTo list all entries run: node mongo.js <password>\nTo add an entry run: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.2j3og.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// If new entry then add it
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ name, number })
  person.save().then(({ name, number }) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else { //List all entries
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(({ name, number }) => {
      console.log(`${name} ${number}`)
    })
    mongoose.connection.close()
  })
}