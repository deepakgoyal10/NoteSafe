import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


// Passing props from Notes.js
function Noteitem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context


    // Destructuring (unpacking) props that are comming from the notes.js
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card  my-2" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* delete Icon imported from font awesome */}
                    <i className="fa-solid fa-trash mx-2" onClick={() => {
                        deleteNote(note._id); props.showAlert('deleteted successfully', "success")
                    }} ></i>
                    {/* edit Icon imported from font awesome */}
        
                    <i className="fa-sharp fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note)  }} ></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem