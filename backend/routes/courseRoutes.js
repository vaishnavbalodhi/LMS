const express = require('express')

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("all courses")
})

router.post("/create",(req, res)=>{
    res.send("course created")
} )

router.get("/:courseId", (req, res)=>{
    res.send("the selecte course is" + req.params.courseId)
})

router.get("/:courseId/:module", (req, res)=>{
    res.send("You are watching" + req.params.module)
})


module.exports = router;