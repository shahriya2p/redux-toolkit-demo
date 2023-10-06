const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  degree: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

const emp = mongoose.model('emp', EmpSchema);
module.exports = { emp };
