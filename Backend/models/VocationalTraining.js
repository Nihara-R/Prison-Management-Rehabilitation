const mongoose = require('mongoose');

const vocationalTrainingSchema = new mongoose.Schema({
  trainingName: {
    type: String,
    required: true,
  },
  vocationalField: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  leadInstructor: {
    type: String,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('VocationalTraining', vocationalTrainingSchema);
