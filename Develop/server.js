// requirements
const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./db/db.json')

// configuration
const PORT = process.env.port || 3001;

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

app.get('/api/notes', (req, res) => 
    res.json(api)
);

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

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