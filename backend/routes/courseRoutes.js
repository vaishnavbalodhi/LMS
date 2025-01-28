const express = require('express')
const { User, Course, Enrollment, Lesson } = require("../db/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const isLoggedIn = require('../middlewares/login');

router.get("/", async (req, res)=>{
    res.send(await Course.find({}))
})

router.post("/create", isLoggedIn,  async (req, res)=>{
    const {title, description} = req.body;
    const tutorId = req.decoded.userId; // Extract userId from the token payload

    const course = new Course({ title, description, tutor:tutorId});
    await course.save();

    res.send("Course has been created");
} )

router.get("/:courseId",  async(req, res)=>{
    const courseId = req.params.courseId;
    const course = await Course.findOne({courseId})
    res.send("the selected course is" + req.params.courseId)
})

router.get("/:courseId/:lessonId", async (req, res)=>{
    const lessonId = req.params.lessonId;
    const lesson = await Lesson.findOne({lessonId})
    res.send("You are watching" + lesson)
})


module.exports = router;