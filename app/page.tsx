import NewNoteForm from '../components/NewNoteForm'
import NoteList from '../components/NoteList'
import { getNotes } from './action/notesAction';

export default async function Home() {
  const notes: Note[] = await getNotes() 
  

  return (
    <div className='main'>
      <header>
        <h1>TODO App</h1>
      </header>

      <NoteList initialNotes={notes} />
      <NewNoteForm />
    </div>
  );
}