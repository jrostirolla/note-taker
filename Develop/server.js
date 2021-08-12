// requirements
const express = require('express');

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

// Listening
app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`)
})