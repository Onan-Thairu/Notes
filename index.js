const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()


app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const Note = require('./models/note')


app.get('/api/notes', (request, response) => {
    Note.find({}).then( notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  
  if (body.content === undefined) {
    return response.status(400).json({error:'Content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  
  note.save().then(savedNote => {
    response.json(savedNote)
  })

})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})