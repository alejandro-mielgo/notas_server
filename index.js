const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app._router.use(express.static('dist'))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/',(request, response) => {
    response.send('<h1>Notes App Server</h1>')
})

app.get('/api/notes',(request,response) => {
    response.json(notes)
})

app.get('/api/notes/:id',(request,response) => {
    const id = Number(request.params.id)
    const note = notes.find( note => note.id === id )

    if (note) {
        response.json(note) 
    } else {
        response.status(404).send('<p>this direction doesnt exist</p>')
    }


})

app.delete('/api/notes/:id', (request, response) =>{
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id!==id)

    response.status(204).end()

})

app.post('/api/notes/', (request,response) =>{
  const body = request.body
  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content:body.content,
    important: Boolean(body.important) || false,
    id: notes.length+1
  }

  console.log(note)
  notes = notes.concat(note)
  response.json(note)

})




const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)

})

