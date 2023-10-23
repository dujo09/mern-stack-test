const express = require("express");
const studentRouter = express.Router();
const mongodb = require("./mongodb");
const ObjectId = require("mongodb").ObjectId;

// studentRouter.route("/students").get(async function (req, res) {
studentRouter.get("/", async function (req, res) {
    // res.send("API is working properly.");

    let mongo_collection = mongodb.getMongoClient().db("school").collection("students");
    // const query = { name: 'Dujo' };
    const student = await mongo_collection.find({}).toArray();

    res.send(student);

});

studentRouter.post("/add",async function (req, res) {
    let mongo_collection = mongodb.getMongoClient().db("school").collection("students");
    let myobj = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      age: req.body.age
    };
    try {
        result = await mongo_collection.insertOne(myobj);
        console.log("Inserted student: " + myobj);

        res.json(result);
    } catch (error) {
        console.error('Failed to insert student!', error);
    }
});

module.exports = studentRouter; 