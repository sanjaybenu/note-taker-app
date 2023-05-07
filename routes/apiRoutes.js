const express = require('express');
const router = express.Router();
const dbNotes = require('../db/notes.json')
const { writeNewNote, removeNote } = require('../helpers/notes');
router.get('/notes', (req, res) => {
    res.json(dbNotes);
});

router.post('/notes', (req, res) => {
    const newNote = writeNewNote(req.body, dbNotes);
    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    removeNote(req.params.id, dbNotes);
    res.json();
});

module.exports = router;
