const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');

// GET all education programs
router.get('/', educationController.getAllEducationPrograms);

// GET a specific education program by ID
router.get('/:id', educationController.getEducationProgramById);

// CREATE a new education program
router.post('/add', educationController.createEducationProgram);

// UPDATE an education program by ID
router.put('/update/:id', educationController.updateEducationProgramById);

// DELETE an education program by ID
router.delete('/delete/:id', educationController.deleteEducationProgramById);

module.exports = router;
