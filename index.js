const yargs = require('yargs')
const pkg = require('./package.json')
const chalk = require('chalk')

const { printNotes, addNote, removeNoteById } = require('./notes.controller')
yargs.version(pkg.version)

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOptions: true
    }
  },
  handler({ title }) {
    addNote(title)
  }
})
yargs.command({
  command: 'list',
  describe: 'print all notes',
  handler() {
    printNotes()
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove note from list by Id',
  builder: {
    id: { type: 'string', describe: 'Note Id', demandOptions: true }
  },
  handler({ id }) {
    removeNoteById(id)
  }
})
yargs.parse()
