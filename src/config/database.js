const mongoose = require('mongoose');
require('dotenv/config');

const chalk = require('chalk');

const connect = async () => {
  const mongoConnectionString = process.env.DB_CONNECTION;
  try {
    const opts = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
    await mongoose.connect(mongoConnectionString, opts);
    console.log(chalk.green('Connected to the database'));
  } catch (err) {
    console.log(chalk.red('Problem with connecting to the database'));
  }
};

module.exports = { connect };
