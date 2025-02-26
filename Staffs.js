const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: String,
  role: String,
  email: String
});

module.exports = mongoose.model('Staff', staffSchema);