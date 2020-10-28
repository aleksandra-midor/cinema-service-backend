const mongoose = require("mongoose");
require('dotenv/config')

const connect = async () => {
  const mongoConnectionString = process.env.DB_CONNECTION
  try {
    const opts ={
      useNewParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoConnectionString, opts);
    console.log("Connected to the database")
  } catch (err) {
console.log("Problem with connecting to the database")
  }
}

module.exports = { connect };