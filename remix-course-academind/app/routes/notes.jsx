import { redirect } from '@remix-run/node'

import NewNote, { links as newNoteLinks } from "../components/NewNote"
// import newNoteStyles from '../components/NewNote.css'
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { getStoredNotes, storeNotes } from "../data/notes";
import { useLoaderData } from '@remix-run/react';

export default function NotesPage() {
    const notesFromLoader = useLoaderData();
    return (
        <main>
            <NewNote />
            <NoteList notes={notesFromLoader}/>
        </main>
    )
}

export async function loader() {
    const notes = await getStoredNotes();

    // 1. simple way to return notes as raw data
    return notes;

    // // 2. how remix returns notes under hood
    // return new Response(JSON.stringify(notes), {headers: {'Content-type': 'application/json'}})
}

export async function action({request}) {
    const formData = await request.formData();
    console.log("formData", formData)
    const noteData = Object.fromEntries(formData);  // return noteData.title, notData.content
    console.log("noteData", noteData)
    // const noteData = {
    //     title: formData.get('title'),
    //     content: formData.get('content')
    // }

    const existingNotes = await getStoredNotes();
    console.log('existingNotes', existingNotes);
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData)
    console.log('updatedNotes', updatedNotes)
    await storeNotes(updatedNotes);
    // await new Promise((resolve, reject) => setTimeout(() => {resolve()}, 2000))
    return redirect('/notes')
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()]
}