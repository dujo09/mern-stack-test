require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongodb = require("./src/mongodb");

var studentsRouter = require("./src/routes");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/students", studentsRouter);

// app.get('/students', (req, res) => {
//     res.send('hello world')
//   })

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

    mongodb.connectToMongoCluster().catch(console.dir);
})