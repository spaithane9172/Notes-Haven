const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/featchUser");
const Notes = require("../modules/Notes");
const { body, validationResult } = require("express-validator");

//fetch all notes of user
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    //fetching user notes
    const notes = await Notes.find({ user: req.user.id });
    //sending user notes with request
    res.send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

//add new note
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const saveNote = await note.save();
      res.status(200).json({ saveNote });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
);

//update note endpoint
router.put(
  "/updateNote/:id",
  fetchUser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      //destructuring data
      const { title, description, tag } = req.body;

      //created new note and updated if data changed
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

      //find note if exists then continue if not then send error
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found.");
      }
      //check the fetched note user id and request user id is same or not
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed.");
      }

      //find the note and update it
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      //after successfull updation send response as note
      res.status(200).json(note);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error.");
    }
  }
);

//endpoint for deleting the note
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found.");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed.");
    }
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).send("Note Deleted Successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
