const express = require('express');
const router = express.Router();
const vocationalTrainingController = require('../controllers/vocationalTrainingController');

// GET all vocational trainings
router.get('/', vocationalTrainingController.getAllVocationalTrainings);

// GET a specific vocational training by ID
router.get('/:id', vocationalTrainingController.getVocationalTrainingById);

// CREATE a new vocational training
router.post('/add', vocationalTrainingController.createVocationalTraining);

// UPDATE a vocational training by ID
router.put('/update/:id', vocationalTrainingController.updateVocationalTrainingById);

// DELETE a vocational training by ID
router.delete('/delete/:id', vocationalTrainingController.deleteVocationalTrainingById);

module.exports = router;
