const asyncHandler = require("express-async-handler");
const Bookings = require("../models/booking");

// @desc get spots
// @route GET /api/spots
// @access Private

const getBookings = asyncHandler(async (req, res) => {
    const bookings = await Bookings.find({user_id: req.user.id});
    return res.status(200).send(bookings);
});


// @desc create new booking
// @route POST /api/bookings/create
// @access Private

const createBooking = asyncHandler(async (req, res) => {

    const {area, spot, id, user_id, fromTime, toTime} = req.body;

    const _booking = new Bookings();
    _booking.user_id = user_id;
    _booking.spot_id = id;
    _booking.timeFrom = fromTime;
    _booking.timeTo = toTime;
    _booking.area = area;
    _booking.spot = spot;

    await _booking.save((err, results) => {
        if (err) {
            console.log(`Error on adding new booking: ${err}`);
            return res.status(200).send(err);
        } else {
            console.log('Booking has been added successfully');
            return res.status(200).send(results);
        }
    });

});

module.exports = {
    getBookings,
    createBooking
};
