// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Require routes file
require('./Develop/routes/routes')(app);

// Setup listener
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);