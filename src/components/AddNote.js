import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (event) => {
        // event.preventDefault() - with this we are saying that dont reload page when user submit any documnet 
        event.preventDefault()

        addNote(note.title, note.description, note.tag)
        // making note input value empty once pressed the add Note button 
        setNote({ title: "", description: "", tag: "" })
        props.showAlert('Added successfully', "success")

    }


    // We use onChange function when we want to trigger a function when user made any change in text box 
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
        //Explaination of above syntax - [...note = jo jo value is note object me vo rahe ] lekin jo iske baad define kiya ja raha hai vo change ya add kardo [[event.target.name]: event.target.value = isme name ko target karke uski value ko change kiya jaa raha hai ]
    }

    return (
        <div>
            <div className="container">
                <h2>Add a Note</h2>
                <form className='my-3' >
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={3} required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange}minLength={3} required  />
                    </div>
                    
                    <button disabled={note.title.length<3|| note.description.length<3} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote