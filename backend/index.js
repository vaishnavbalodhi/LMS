const express = require('express')
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes')
// const courseRoutes = require('./routes/courseRoutes')

const app = express()

app.use(express.json())


app.use("/users", userRoutes )
// app.use("/course", courseRoutes )

// app.get("/", (req, res) => {
//     res.send("Done")
// })    

app.listen(3000, () => {
    console.log("server is on " + 3000);

})