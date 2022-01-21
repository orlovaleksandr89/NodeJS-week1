document.addEventListener('DOMContentLoaded', () => {
  const deleteNoteById = async (id) => {
    try {
      const data = { id: id }
      await fetch(`/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function updateNote(id) {
    const title = prompt('Update note title')
    if (title === null || title.length === 0) {
      alert("You didn't change the note")
      return
    }
    try {
      const data = { id, title }
      await fetch('/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return title
    } catch (error) {
      console.log(error)
    }
  }

  document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
      const id = event.target.dataset.id
      deleteNoteById(id)
        .then(() => event.target.closest('li').remove())
        .catch((error) => console.error(error))
    } else if (event.target.dataset.type === 'update') {
      const id = event.target.dataset.id
      const li = event.target.closest('li')
      const text = li.firstElementChild

      updateNote(id)
        .then((title) => (text.textContent = title))
        .catch((error) => console.log(error))
    }
  })
})
