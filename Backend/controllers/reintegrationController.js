const Reintegration = require('../models/Reintegration');

// Controller function to get all reintegration records
const getAllReintegrationRecords = async (req, res) => {
  try {
    const records = await Reintegration.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a specific reintegration record by ID
const getReintegrationRecordById = async (req, res) => {
  try {
    const record = await Reintegration.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Reintegration record not found' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new reintegration record
const createReintegrationRecord = async (req, res) => {
  const {
    recordName,
    recordType,
    startDate,
    endDate,
    programLocation,
    programCoordinator,
    preferredLanguage,
    specialAccommodations,
    participation
  } = req.body;

  try {
    const record = new Reintegration({
      recordName,
      recordType,
      startDate,
      endDate,
      programLocation,
      programCoordinator,
      preferredLanguage,
      specialAccommodations,
      participation
    });

    const newRecord = await record.save();
    res.status(201).json({ message: 'Reintegration record added successfully', newRecord });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to update a reintegration record by ID
const updateReintegrationRecordById = async (req, res) => {
  try {
    const record = await Reintegration.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Reintegration record not found' });
    }

    // Update record details
    for (const key in req.body) {
      if (req.body[key] != null) {
        record[key] = req.body[key];
      }
    }

    const updatedRecord = await record.save();
    res.json({ message: 'Reintegration record updated', updatedRecord });
  } catch (err) {
    res.status(400).json({ message: 'Reintegration record update unsuccessful', error: err.message });
  }
};

// Controller function to delete a reintegration record by ID
const deleteReintegrationRecordById = async (req, res) => {
  try {
    const record = await Reintegration.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Reintegration record not found' });
    }
    await record.deleteOne();
    res.json({ message: 'Reintegration record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllReintegrationRecords,
  getReintegrationRecordById,
  createReintegrationRecord,
  updateReintegrationRecordById,
  deleteReintegrationRecordById
};
