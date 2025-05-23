const jwt = require("jsonwebtoken")
require("dotenv").config();

const verifyToken = async (request, h) => {
    const authHeader = request.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return h.response({ message: "Access denied. No token provided." }).code(401).takeover();
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.auth = { userId:decoded.id }
        return h.continue;
    } catch (error) {
        return h.response({ message: "Invalid token" }).code(401).takeover();
    }
}

module.exports = verifyToken;