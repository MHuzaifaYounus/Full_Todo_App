import { database } from "@/utility/appwrite";
import { ID } from "appwrite"


export default async function addNote(content: string): Promise<Note> {
    const newNote = { content: content }

    const response = await database.createDocument(
        "notesapp",
        "notes",
        ID.unique(),
        newNote
    )
    const note = {
        $id: response.$id,
        $createdAt: response.$createdAt,
        content: response.content
    }
    return note

}
export async function getNotes(): Promise<Note[]> {
    const response = await database.listDocuments(
        "notesapp",
        "notes"
    )
    const notes: Note[] = response.documents.map((doc) => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        content: doc.content
    }))
    return notes
}
export async function deletNote(noteID: string) {
    database.deleteDocument(
        "notesapp",
        "notes",
        noteID
    )

}