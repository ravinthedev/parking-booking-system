const asyncHandler = require("express-async-handler");
const Spots = require("../models/spots");
const _ = require('lodash');

// @desc get spots
// @route GET /api/spots
// @access Private
const getSpots = asyncHandler(async (req, res) => {

    const {area, fromTime, toTime} = req.body;

    try {
        await Spots.aggregate(
            [
                {$match: {"area": area}},
                // Join the spots and bookings collections
                {
                    $lookup: {
                        from: "bookings",
                        localField: "_id",
                        foreignField: "spot_id",
                        as: "bookings"
                    }
                },
                // Filter the bookings to only include those where timeFrom and timeTo is not equal or not within the range of the given timeFrom and timeTo
                {
                    $project: {
                        area: 1,
                        spot: 1,
                        location: 1,
                        bookings: {
                            $filter: {
                                input: "$bookings",
                                as: "booking",
                                cond: {
                                    $or: [
                                        {
                                            $and: [
                                                {
                                                    $gte: ["$$booking.timeFrom", fromTime]
                                                },
                                                {
                                                    $lte: ["$$booking.timeTo", toTime]
                                                }
                                            ]
                                        },
                                        {
                                            $and: [
                                                {
                                                    $lte: ["$$booking.timeFrom", fromTime]
                                                },
                                                {
                                                    $gte: ["$$booking.timeTo", toTime]
                                                }
                                            ]
                                        }]
                                }
                            }
                        }
                    }
                },
                // Count the number of bookings for each spot
                {
                    $group: {
                        _id: "$_id",
                        spot: {$first: "$spot"},
                        area: {$first: "$area"},
                        location: {$first: "$location"},
                        booking_count: {
                            $sum: {
                                $size: "$bookings"
                            }
                        }
                    }
                }
            ]
        ).exec((err, result) => {
            if (result) {
                const spots = result.sort((a, b) => (a._id > b._id) ? 1 : -1)
                return res.status(200).json(spots);
            }
            if (err) {
                return res.status(400).json(err);
            }
        })

    } catch (error) {
        return res.status(400).json(error);
    }


});

module.exports = {
    getSpots
};
