// requirements
const express = require('express');
const path = require('path');
const fs = require('fs');
const database = require('./db/db.json')
const uuid = require('./uuid');

// configuration
const PORT = process.env.PORT || 8080;

const app = express();
const router = express.Router();

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

// Routes
// GET route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET routes for notepage
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {

            const parsedNotes = JSON.parse(data);

            res.json(parsedNotes);
        }
})});

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

   const newNote = {
       title,
       text,
       id: uuid(),
   }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(newNote);

            fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedNotes, null, 4), 
                (err) => 
                err ? console.log(err) : console.log('Write successful')
            )   

        }
    })
    res.send(200);
});

// Listening
app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`)
})