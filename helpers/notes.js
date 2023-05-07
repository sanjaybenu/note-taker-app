// importing npm module
const fs = require('fs');
const path = require('path');
// importing npm module uuid to prove unique id to each note
const uuid = require('uuid');

// function to write new note in notes.json
const writeNewNote = (body, notesObj) => { 
    const note = { ...body, id: uuid.v4() };
    notesObj.push(note);
    fs.writeFile(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify(notesObj, null, 2), (err)=>{
            if (err){

                console.log('error')
        }
});
    return note;
}

// function to rewrite notes.json file after note removal
const removeNote = (id, notesObj) => {
    notesObj = notesObj.filter(note => note.id !== id);
    fs.writeFile(path.join(__dirname, '../db/notes.json'), JSON.stringify(notesObj, null, 2),(err)=>{
        if (err){

            console.log('error')
        }
    });
    
};




// exporting functions
module.exports = { writeNewNote, removeNote };