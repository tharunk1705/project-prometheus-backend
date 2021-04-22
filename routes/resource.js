const express = require("express");
const router = express.Router();

const { createResource, getAllResources} = require("../controllers/resource");

router.post("/resource/create", createResource);
router.get("/resource/available", getAllResources);
module.exports = router;