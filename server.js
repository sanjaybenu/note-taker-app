const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const dbNotes = require('./db/notes.json')
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/api/notes', (req, res) => {
    res.json(dbNotes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//Function to write New Note
const writeNewNote = (body, notesObj) => { 
    if (!Array.isArray(notesObj)){
        notesObj = [];
    }
    const note = { ...body, id: uuid.v4() };
    notesObj.push(note);
    fs.writeFile(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify(notesObj, null, 2), (err)=>{
            if (err){

                console.log('error')
        }
});
    return note;
}

// api Routes
app.post('/api/notes', (req, res) => {
    const newNote = writeNewNote(req.body, dbNotes);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    removeNote(req.params.id, dbNotes);
    res.json();
});

// Function to delete notes
const removeNote = (id, notesObj) => {
    notesObj = notesObj.filter(note => note.id !== id);
    fs.writeFile(path.join(__dirname, './db/notes.json'), JSON.stringify(notesObj, null, 2),(err)=>{
        if (err){

            console.log('error')
        }
    });
    
};

// Initialising Server
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}!`);
});