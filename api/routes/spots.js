const express = require("express");
const {
    getSpots
} = require("../controllers/spots");
const protectRoute = require("../middleware/auth");
const router = express.Router();

router.post("/feed",protectRoute, getSpots);

module.exports = router;
