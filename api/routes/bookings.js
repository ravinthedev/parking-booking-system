const express = require("express");
const {
    getBookings,
    createBooking
} = require("../controllers/booking");
const protectRoute = require("../middleware/auth");
const router = express.Router();

router.get("/feed", protectRoute, getBookings);
router.post("/create", protectRoute, createBooking);

module.exports = router;



