const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

const {signout, signup, signin, isSignedIn} = require("../controllers/auth");

// SIGN-UP ROUTE
router.post("/signup", [
    check("firstName", "Should be Greater than 3 Characters!").isLength({min : 3}),
    check("email","Please Enter a valid email Id").isEmail(),
    check("password", "Password should be Greater than 3 Chars").isLength({min : 3})
], signup);

// SIGN-IN ROUTE
router.post("/signin", [
    check("email","Please Enter a valid email Id").isEmail(),
    check("password", "Password should be Greater than 3 Chars").isLength({min : 3})
], signin);


router.get("/signout", signout);


module.exports = router;