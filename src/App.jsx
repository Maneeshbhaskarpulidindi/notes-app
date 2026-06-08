import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function App() {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState([])

  async function loadNotes() {
    const { data, error } = await supabase
      .from('notes')
      .select('*')

    console.log("LOAD DATA:", data)
    console.log("LOAD ERROR:", error)

    if (!error) {
      setNotes(data)
    }
  }

  async function deleteNote(id) {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)

    if (!error) {
      loadNotes()
    }
  }

  async function addNote() {
    const { error } = await supabase
      .from('notes')
      .insert([
        {
          title: title,
          content: ''
        }
      ])

    if (!error) {
      setTitle('')
      loadNotes()
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notes App</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note"
      />

      <button onClick={addNote}>
        Add Note
      </button>

      <hr />

      {notes.map(note => (
        <div key={note.id}>
          {note.title}

          <button
            onClick={() => deleteNote(note.id)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App