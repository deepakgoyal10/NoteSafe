const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1: Get all the notes using GET 'api/notes/fetchallnotes' Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // sending 500 error code if some error occured
    res.status(500).send("some error occured in fetchallnotes");
  }
});


// ROUTE 2: Add a new notes using POST 'api/notes/addnote' Login required
router.post("/addnote", fetchUser,
  [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // taking out all the element from req.body
      const { title, description, tag } = req.body;
      // Checking if user have send values in our above assigned format
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        // defining data to the schema
        title,
        description,
        tag,
        // defining id for the specific user
        user: req.user.id,
      });
      // Saving all data to the database
      const saveNote = await note.save();
      // sending response
      res.json(saveNote);
    } catch (error) {
      console.log(error);
      // sending 500 error code if some error occured
      res.status(500).send("some error occured");
    }
  }
);
// ROUTE 3 : Updating an exisitin note using : PATCH "api/notes/updatenote " login required
router.patch("/updatenote/:id", fetchUser,
  [
    body("title", "Enter a valid title minimun of 3 charachers").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be minimimum of 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    try {
      // creating a new note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      // Find the note to be updated and update it.
      let note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.log(error);
      // sending 500 error code if some error occured
      res.status(500).send("some error occured");
    }
  }
);

// ROUTE 4 : Deleting existing note using DELETE "api/notes/deletenote" - login reqired
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it.
    let note = await Note.findById(req.params.id);

    // checking if id exist or not
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user own this note: note.user will return an objectId for eg: new ObjectId("641bf9cbd235c3e44c3e0940") and toString() method will take string out it and return a string in this case string is an user Id so we can identify that it is the same user that is requesting to perform some action.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error);
    // sending 500 error code if some error occured
    res.status(500).send("some error occured");
  }
});

module.exports = router;
