import React, { useState } from 'react'

import noteContext from './noteContext'
import Notes from '../../components/Notes'


const NoteState = (props) => {
  const host = "http://localhost:5000"



  const notesInitial = []

  // setting up the state for notes
  const [notes, setNotes] = useState(notesInitial)

  // Get all notes from the database
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }
    });

    // parsing response into json format
    const json = await response.json()
    //  console.log(json)
    // setting up Note State 
    setNotes(json)


  }
  // Add a note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      
    });
    const json = await response.json()

    console.log('adding a new note')
    let note = json
    // The concat() method joins two or more strings. t1=deep t2 =char  and we use t1.concat(t2) output will be = deepchar

    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id) => {
    console.log(id)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }
    });

    // parsing response into json format
    const json = await response.json()
    console.log(json)

    console.log('deleting note with id' + id)
    // filter method will filter out that one note that dosnt match enterd condition and then automatic it will delete it.
    const newNotes = notes.filter((note) => { return note._id !== id }) // In this case it will check all notes id and jo id match kar jaegi us note ko ye delete kar dega 
    setNotes(newNotes)

  }




  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)

    // Making a deep copy of notes because we can't directly setstate in react
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Creating a for loop to checking id of our note which we want to edit 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      // Checking the id
      if (element._id === id) {
        // setting up the updated value for the frontend
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        // Once get updated breaking the loop 
        break
      }


    }
    // seting up the note state with updated values
    setNotes(newNotes)
  }

  return (
    // This is providing value to noteContext, Whenever we assign any value to this it will automatically send values to all childrens 
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </noteContext.Provider>
  )

}

export default NoteState;