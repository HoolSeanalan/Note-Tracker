const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const notes = require('../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const note = notes.find(note => note.id === req.params.id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).send('Note not found');
    }
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notes[notes.length-1].id + 1;
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    const noteIndex = notes.findIndex(function (note) {
        return note.id == req.params.id;
        });
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
        res.sendStatus(204);
    } else {
        res.status(404).send('Note not found');
    }
});

module.exports = router;