const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
  
    const addNote = (event) => {
      event.preventDefault()
      console.log('button clicked', event.target)
    }
  
    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {notes.map((note, i) => 
            <Note key={i} note={note} />
          )}
        </ul>
        <form onSubmit={addNote}>
          <input />
          <button type="submit">save</button>
        </form>   
      </div>
    )
  }
  