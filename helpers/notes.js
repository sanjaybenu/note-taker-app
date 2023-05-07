const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

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

const removeNote = (id, notesObj) => {
    notesObj = notesObj.filter(note => note.id !== id);
    fs.writeFile(path.join(__dirname, '../db/notes.json'), JSON.stringify(notesObj, null, 2),(err)=>{
        if (err){

            console.log('error')
        }
    });
    
};

module.exports = { writeNewNote, removeNote };