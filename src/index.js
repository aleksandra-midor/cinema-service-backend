const { connect } = require('./config/database');
const app = require('./server');
require('dotenv/config');

const port = process.env.PORT || 5000;

connect();

app.listen(port, () => console.log(`Running on Port ${port}`));
