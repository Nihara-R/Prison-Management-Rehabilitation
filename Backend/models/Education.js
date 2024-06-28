const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true,
  },
  category: {
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
  ageGroup: {
    type: String,
    enum: ['18 - 25', '26 - 35', '36 - 50', 'Above 50'],
    required: true,
  },
  instructors: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Education', educationSchema);
