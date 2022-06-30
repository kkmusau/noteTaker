const fs = require('fs');
const path = require('path');

module.exports = app => {

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);
        
        //GET route for retrieving the notes
        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

        // POST Route for api/notes setup
        app.post('/api/notes', (req, res) => {
            // 
            let newNote = req.body;
            // adds id to new notes
            newNote.id = Math.max(... notes.map(obj=>obj.id)) + 1;
            notes.push(newNote);
            updateDb();
            return console.log('Added new note:' +newNote.title);
        });

        // GET route for updating the db with specific id
        app.get('/:$notes/:id', (req,res) => {
            res.json(notes[req.params.id])
        });

        // DELETE Route for a specific note id
        app.delete('/api/notes/:id', (req, res) => {
            // filters notes to delete by note id
            notes = notes.filter(obj => obj.id != req.params.id);

            console.log(notes);
            updateDb();
            console.log('Deleted note with id'+ req.params.id);
        });

        //GET Route for notes page
        app.get ('/notes', (req,res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });
        
        //Wildcard route to direct users to homepage
        app.get('*', (req,res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        // Function to update whenever a note is added or deleted
        function updateDb() {
            fs.writeFile('db/db.json', JSON.stringify(notes,'\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}
