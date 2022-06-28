const fs = require('fs');
const path = require('path');

module.exports = router => {

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        router.get('/api/notes', function(req, res) {
            res.json(notes);
        });

        router.post('/api/notes', function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log('Added new note:' +newNote.title);
        });

        router.get('/api/notes/:${id}', function(req,res){
            res.json(notes[req.params.id])
        });

        router.delete('/api/notes/:${id}', function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log('Deleted note with id'+ req.params.id);
        });

        router.get ('/notes', function(re1,res) {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });

        router.get('*', function(req,res){
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        function updateDb() {
            fs.writeFile('db/db.json', JSON.stringify(notes,'\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}
























// const router = require('express').Router();
// const { v4: uuidv4 } = require('uuid');
// const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
// const fs = require('fs');
// const db = require('../db/db.json');
// const obj = JSON.parse(JSON.stringify(db));
// console.log(obj);


// router.get('/', (req, res) => res.sendFile(notes));





// // GET Route for retrieving all the notes
// router.get('/', (req, res) =>
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
// );

// // POST Route for submitting the notes
// router.post('/', (req, res) => {
//     // Destructuring assignment for the items in req.body
//     const { title, text } = req.body;

//     // If all the required properties are present
//     if (title && text) {
//         // Variable for the object we will save
//         const newNote = {
//             title,
//             text,
//             note_id: uuidv4(),
//         };

//         readAndAppend(newNote, './db/db.json');

//         const response = {
//             status: 'success',
//             body: newNote,
//         };

//         res.json(response);
//     } else {
//         res.json('Error in posting note');
//     }
// });

// module.exports = router;
