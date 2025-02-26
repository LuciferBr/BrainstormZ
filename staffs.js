const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

// Get all staff
router.get('/', async (req, res) => {
  const staff = await Staff.find();
  res.json(staff);
});

// Add staff
router.post('/', async (req, res) => {
  const newStaff = new Staff(req.body);
  await newStaff.save();
  res.json(newStaff);
});

module.exports = router;