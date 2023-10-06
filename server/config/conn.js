/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/empdb', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  (success) => {
    console.log('Connection Successfully Done');
  },
  (error) => {
    console.log('Connection Failed', error);
  },
);

