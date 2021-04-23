const express = require("express");
const router = express.Router();

const { getUserById} = require("../controllers/user");
const { createResource, getAllResources, getMyResources} = require("../controllers/resource");

router.param("userId", getUserById);


router.post("/resource/create", createResource);
router.get("/resource/available", getAllResources);
router.get("/user/:userId/resource", getMyResources);
module.exports = router;