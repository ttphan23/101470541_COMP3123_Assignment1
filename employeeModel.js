const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  position: String,
  salary: Number,
  date_of_joining: Date,
  department: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Employee', employeeSchema);
