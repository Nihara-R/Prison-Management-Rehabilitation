const express = require('express');
const router = express.Router();
const reintegrationController = require('../controllers/reintegrationController');

// GET all reintegration records
router.get('/', reintegrationController.getAllReintegrationRecords);

// GET a specific reintegration record by ID
router.get('/:id', reintegrationController.getReintegrationRecordById);

// CREATE a new reintegration record
router.post('/add', reintegrationController.createReintegrationRecord);

// UPDATE a reintegration record by ID
router.put('/update/:id', reintegrationController.updateReintegrationRecordById);

// DELETE a reintegration record by ID
router.delete('/delete/:id', reintegrationController.deleteReintegrationRecordById);

module.exports = router;
