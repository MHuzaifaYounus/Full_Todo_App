'use client'
import addNote from '@/app/action/notesAction';
import { useState } from 'react'

const NewNoteForm = () => {
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(content.trim() != "" ){
      await addNote(content)
      setContent("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your todo here..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewNoteForm