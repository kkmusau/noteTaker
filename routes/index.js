const router = require('express').Router();
const notes = require('../public/hotes.html');

router.get('/', (req,res)=> res.sendFile(notes));

module.exports = router;
