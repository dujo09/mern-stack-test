const express = require("express");
const mongodb = require("./mongodb");

const studentsRouter = express.Router();

studentsRouter.get("/", async function (req, res) {
    console.log("Fetching students from database...");

    let studentsCollection = mongodb.getMongoClient().db("school").collection("students");
    const students = await studentsCollection.find({}).toArray();

    console.log("Fetched students successfully!");

    res.send(students);
});

studentsRouter.post("/add",async function (req, res) {
    let newStudent = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      age: Number(req.body.age)
    };

    console.log("Inserting student \"${ newStudent.name } ${ newStudent.surname }\" into database...");

    let studentsCollection = mongodb.getMongoClient().db("school").collection("students");

    try {
        response = await studentsCollection.insertOne(newStudent);

        console.log("Student \"${ newStudent.name } ${ newStudent.surname }\" inserted successfully!");

        res.json(response); // TODO: .json or .send
    } catch (error) {
        console.error("Failed to insert student \"${ newStudent.name } ${ newStudent.surname }\", error: ${ error }");
    }
});

module.exports = studentsRouter; 