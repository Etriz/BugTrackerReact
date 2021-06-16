const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

const db = require('./db');
const issueRouter = require('./routes/issueRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'Mongoose connection error:'));

app.get('/', (req, res) => {
  res.send('Hello world from server');
});

app.use('/api', issueRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
