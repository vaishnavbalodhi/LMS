const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization; 
    let decoded = null;
    if (!token) {
        res.send("token not found")
    }
    
    try{
        decoded = jwt.verify(token, "your-secret-key"); // Replace with your JWT secret key or use process.env.JWT_SECRET
    }
    catch(e){
        res.status(411).send("invalid access")
    }
    req.decoded = decoded;
    next();
}