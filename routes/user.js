const express = require("express");
const router = express.Router();

const {getUserById, getUser, updateUser, signupAsDonor, getAllDonors, searchDonor} = require("../controllers/user");
const {isAuthenticated, isSignedIn, isAdmin} = require("../controllers/auth");


router.param("userId", getUserById);
router.get("/user/:userId", getUser);
// updating the user
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.post("/user/:userId/donor/signup",signupAsDonor);
router.get("/donors",getAllDonors);
router.post("/searchDonor", searchDonor);

// router.get("/users",getAllUsers) Assignment
module.exports = router;