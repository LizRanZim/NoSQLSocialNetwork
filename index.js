// used code from lesson 18-25

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = 3001;
const app = express();

// Indicates what activity's server is running in the terminal.
const activity = cwd.includes('NoSQLSocialNetwork')
  ? cwd.split('/NoSQLSocialNetwork/')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});