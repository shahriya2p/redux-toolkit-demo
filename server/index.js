/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const empRouter = require('./routes/EmpRoute');
app.use(cors());
app.use(express.static(`${__dirname}/`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/emp', empRouter);

app.listen(5000, () => {
  console.log('Server is Running on 5000');
});
