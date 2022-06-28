// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');



// Initialize express router
const router = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static(__dirname));

//Require routes file
require('./routes/index')(router);

// Setup listener
router.listen(PORT, () =>
    console.log(`router listening at http://localhost:${PORT} 🚀`)
);