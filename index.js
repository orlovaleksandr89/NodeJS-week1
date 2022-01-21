const express = require('express')
const chalk = require('chalk')
const PORT = 3000
const path = require('path')
const {
  addNote,
  getNotes,
  removeNoteById,
  updateNote
} = require('./notes.controller')

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false,
    deleted: false
  })
})
app.post('/', async (req, res) => {
  const { title } = req.body
  await addNote(title)
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: true
  })
})
app.delete('/', async (req, res) => {
  const { id } = req.body
  await removeNoteById(id)
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false
  })
})
app.put('/', async (req, res) => {
  const { id, title } = req.body
  await updateNote(id, title)
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false
  })
})
app.listen(PORT, () => {
  console.log(chalk.greenBright(`Server workin on port: ${PORT}`))
})
