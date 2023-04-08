const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    
    user:{
        // defining type of object and path (ref) of object
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        
        type: String,
        required: true

    },
    tag: {
        type: String,
        dafault: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    },
})

NotesModel = mongoose.model("notes", NotesSchema)

module.exports = NotesModel