const express = require("express");
const studentRouter = express.Router();
const mongodb = require("./mongodb");

studentRouter.get("/", async function (req, res) {
    let mongo_collection = mongodb.getMongoClient().db("school").collection("students");
    const student = await mongo_collection.find({}).toArray();

    console.log("Fetched all students successfully!");

    res.send(student);
});

studentRouter.post("/add",async function (req, res) {
    let myobj = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      age: req.body.age
    };

    let mongo_collection = mongodb.getMongoClient().db("school").collection("students");

    try {
        result = await mongo_collection.insertOne(myobj);
        console.log("Inserted student: " + myobj.name);

        res.json(result);
    } catch (error) {
        console.error('Failed to insert student!', error);
    }
});

module.exports = studentRouter; 