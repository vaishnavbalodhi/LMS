const express = require('express')
const mongoose = require('mongoose');
const { User, Course, Enrollment } = require('./db/db');
const app = express()
const router = express.Router();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Done")
})

app.use("/users", )

app.post("/users/register", (req, res) => {
    const user = {
        name: req.headers.name,
        email: req.headers.email,
        password: req.headers.password,
        role: "student",
    }
    // console.log(req.headers.username)

    User.create(user)
    res.send("badhiya")
})

app.post("users/login", (req, res)=>{

})

app.listen(3000, () => {
    console.log("server is on " + 3000);

})