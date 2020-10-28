const { connect } = require("./config/database");
const app = require("./server");

connect();

app.listen(5001, () => console.log("Running on Port 5001"));