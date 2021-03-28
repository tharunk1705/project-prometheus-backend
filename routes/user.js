const express = require("express");
const router = express.Router();

const {getUserById, getUser, updateUser, signupAsDonor, getAllDonors} = require("../controllers/user");
const {isAuthenticated, isSignedIn, isAdmin} = require("../controllers/auth");


router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// updating the user
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.post("/user/:userId/donor/signup", isSignedIn, isAuthenticated, signupAsDonor);
router.get("/admin/donors/:userId",isSignedIn, isAuthenticated, isAdmin, getAllDonors);


// router.get("/users",getAllUsers) Assignment
module.exports = router;