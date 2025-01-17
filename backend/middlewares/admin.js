const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);

    let decoded = null;
    try {
        decoded = jwt.verify(token, "your-secret-key");
        // console.log(decoded);
    } catch (e) {
        console.log(e);
    }
    if (decoded.role != "admin") res.status(411).send("invalid access");

    next();
}