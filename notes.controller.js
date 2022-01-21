const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'mockdb.json')

async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    _id: Date.now().toString()
  }
  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.green.bold('Note was added'))
}

async function removeNoteById(noteId) {
  const notes = await getNotes()

  if (notes.length === 0) {
    return console.log(chalk.red.bold('There are no notes to remove'))
  }
  if (notes.indexOf(notes.find((note) => note._id === noteId)) === -1) {
    return console.log(chalk.red.bold("Note wasn't found"))
  }

  const updatedNotes = notes.filter((note) => note._id !== noteId)
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
  console.log(
    chalk.redBright.bold(
      `Note with id: ${chalk.green.bold(noteId)} was deleted`
    )
  )
}

async function getNotes() {
  let notes = await fs.readFile(notesPath, { encoding: 'utf8' })
  notes = JSON.parse(notes)
  return Array.isArray(notes) ? notes : []
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.blueBright('Here are the notes:'))
  notes.forEach((note) =>
    console.log(chalk.blueBright(' id:', note._id + ',', 'title:', note.title))
  )
}

async function updateNote(noteId, title) {
  const notes = await getNotes()

  if (notes.length === 0) {
    return console.log(chalk.red.bold('There are no notes to remove'))
  }
  if (notes.indexOf(notes.find((note) => note._id === noteId)) === -1) {
    return console.log(chalk.red.bold("Note wasn't found"))
  }
  if (title.length === 0) {
    console.log(chalk.red.bold("Note can't be empty"))
    return
  }
  const updatedNotes = notes.map((note) => {
    if (note._id === noteId) {
      return { ...note, title: title }
    }
    return note
  })
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
  console.log(chalk.yellowBright('Note updated'))
}
module.exports = {
  addNote,
  printNotes,
  removeNoteById,
  getNotes,
  updateNote
}
