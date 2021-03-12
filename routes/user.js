const express = require("express");
const router = express.Router();

const {getUserById, getUser, updateUser, signupAsDonor} = require("../controllers/user");
const {isAuthenticated, isSignedIn} = require("../controllers/auth");


router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// updating the user
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.post("/user/:userId/donor/signup", isSignedIn, isAuthenticated, signupAsDonor);



// router.get("/users",getAllUsers) Assignment
module.exports = router;