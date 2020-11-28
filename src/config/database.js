const mongoose = require('mongoose');
const chalk = require('chalk');

const envFiles = {
  development: '.env',
  test: '.env.test',
};

const env = require('dotenv').config({ path: envFiles[process.env.NODE_ENV] });

const connect = async () => {
  const mongoConnectionString = env.parsed.DB_CONNECTION;
  try {
    const opts = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
    await mongoose.connect(mongoConnectionString, opts);
    console.log(
      chalk.green(`Connected to the [${process.env.NODE_ENV}] database`)
    );
  } catch (err) {
    console.log(chalk.red('Problem with connecting to the database'));
  }
};

module.exports = { connect };
