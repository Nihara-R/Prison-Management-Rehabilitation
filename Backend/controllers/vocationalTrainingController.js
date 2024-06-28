const VocationalTraining = require('../models/VocationalTraining');

// Controller function to get all vocational trainings
const getAllVocationalTrainings = async (req, res) => {
  try {
    const trainings = await VocationalTraining.find();
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a specific vocational training by ID
const getVocationalTrainingById = async (req, res) => {
  try {
    const training = await VocationalTraining.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Vocational training not found' });
    }
    res.json(training);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new vocational training
const createVocationalTraining = async (req, res) => {
  const {
    trainingName,
    vocationalField,
    date,
    time,
    location,
    durationHours,
    leadInstructor,
    maxParticipants
  } = req.body;

  try {
    const training = new VocationalTraining({
      trainingName,
      vocationalField,
      date,
      time,
      location,
      durationHours,
      leadInstructor,
      maxParticipants
    });

    const newTraining = await training.save();
    res.status(201).json({ message: 'Vocational training added successfully', newTraining });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to update a vocational training by ID
const updateVocationalTrainingById = async (req, res) => {
  try {
    const training = await VocationalTraining.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Vocational training not found' });
    }

    // Update training details
    for (const key in req.body) {
      if (req.body[key] != null) {
        training[key] = req.body[key];
      }
    }

    const updatedTraining = await training.save();
    res.json({ message: 'Vocational training updated', updatedTraining });
  } catch (err) {
    res.status(400).json({ message: 'Vocational training update unsuccessful', error: err.message });
  }
};

// Controller function to delete a vocational training by ID
const deleteVocationalTrainingById = async (req, res) => {
  try {
    const training = await VocationalTraining.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Vocational training not found' });
    }
    await training.deleteOne();
    res.json({ message: 'Vocational training deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllVocationalTrainings,
  getVocationalTrainingById,
  createVocationalTraining,
  updateVocationalTrainingById,
  deleteVocationalTrainingById
};
