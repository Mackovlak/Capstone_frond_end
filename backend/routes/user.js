const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config();

//controller
const { 
    getUser,
    registerUser, 
    loginUser 
} = require("../controllers/userController");
const { scrapeListSkinCondition } = require("../controllers/scrappingDataController")

module.exports =[
    {
        method: "GET",
        path: "/api/user",
        handler: getUser
    },
    {
        method: "POST",
        path: "/api/register",
        handler: registerUser,
    },
    {
        method: "POST",
        path: "/api/login",
        handler: loginUser,
    },
    {
        method: "GET",
        path: "/api/list-skin-condition",
        handler: scrapeListSkinCondition
    }
];