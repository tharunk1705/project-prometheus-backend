const express = require("express");
const router = express.Router();

const { getUserById} = require("../controllers/user");
const { getResourceById, createResource, getAllResources, getMyResources, deleteResource} = require("../controllers/resource");

router.param("userId", getUserById);
router.param("resourceId", getResourceById);

router.post("/resource/create", createResource);
router.get("/resource/available", getAllResources);
router.get("/user/:userId/resource", getMyResources);

router.delete("/user/:userId/resource/:resourceId", deleteResource)
module.exports = router;