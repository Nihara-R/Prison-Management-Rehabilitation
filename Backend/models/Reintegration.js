const mongoose = require('mongoose');

const reintegrationSchema = new mongoose.Schema({
  recordName: {
    type: String,
    required: true,
  },
  recordType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  programLocation: {
    type: String,
    required: true,
  },
  programCoordinator: {
    type: String,
    required: true,
  },
  preferredLanguage: {
    type: String,
    enum: ['English', 'Sinhala', 'Tamil'],
    required: true,
  },
  specialAccommodations: {
    type: String,
    required: false,
  },
  participation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reintegration', reintegrationSchema);
