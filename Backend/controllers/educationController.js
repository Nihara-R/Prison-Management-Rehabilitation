const Education = require('../models/Education');

// Controller function to get all education programs
const getAllEducationPrograms = async (req, res) => {
  try {
    const programs = await Education.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a specific education program by ID
const getEducationProgramById = async (req, res) => {
  try {
    const program = await Education.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Education program not found' });
    }
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new education program
const createEducationProgram = async (req, res) => {
  const {
    programName,
    category,
    date,
    time,
    location,
    ageGroup,
    instructors
  } = req.body;

  try {
    const program = new Education({
      programName,
      category,
      date,
      time,
      location,
      ageGroup,
      instructors
    });

    const newProgram = await program.save();
    res.status(201).json({ message: 'Education program added successfully', newProgram });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to update an education program by ID
const updateEducationProgramById = async (req, res) => {
  try {
    const program = await Education.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Education program not found' });
    }

    // Update program details
    for (const key in req.body) {
      if (req.body[key] != null) {
        program[key] = req.body[key];
      }
    }

    const updatedProgram = await program.save();
    res.json({ message: 'Education program updated', updatedProgram });
  } catch (err) {
    res.status(400).json({ message: 'Education program update unsuccessful', error: err.message });
  }
};

// Controller function to delete an education program by ID
const deleteEducationProgramById = async (req, res) => {
  try {
    const program = await Education.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Education program not found' });
    }
    await program.deleteOne();
    res.json({ message: 'Education program deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllEducationPrograms,
  getEducationProgramById,
  createEducationProgram,
  updateEducationProgramById,
  deleteEducationProgramById
};
