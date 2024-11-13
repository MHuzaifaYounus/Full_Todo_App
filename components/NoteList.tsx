'use client'
import { deletNote } from '@/app/action/notesAction'
import { client } from '@/utility/appwrite'
import { useEffect, useState} from 'react'

export default function NoteList({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)

  useEffect(() => { 
    const channel = "databases.notesapp.collections.notes.documents"

    const unsubscribe = client.subscribe(channel,(response) => { 
      const eventType = response.events[0]
      console.log(response.events[0]);
      const changedNote = response.payload as Note
      if(eventType.includes('create')){
        setNotes((prevNotes => [changedNote ,...prevNotes]))
      }
      if(eventType.includes('delete')){
        setNotes((prevNotes => prevNotes.filter((note) => note.$id !== changedNote.$id)))
      }
     })
     return () => unsubscribe()

   },[])

  const handleDelete = async (noteId: string) => {
    const note = document.getElementById(noteId) as HTMLElement | null
    if(note){
      note.classList.add("crossed-out")
    }

    await deletNote(noteId)
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.$id} id={note.$id} onClick={() => handleDelete(note.$id)}>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  )
}
