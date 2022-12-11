const asyncHandler = require("express-async-handler");
const Spots = require("../models/spots");
const Users = require("../models/users");
const Bookings = require("../models/booking");
const _ = require('lodash');
const validateRequest = require("./validate/index");
const moment = require("moment");

// @desc get spots
// @route GET /api/spots
// @access Private
const getSpots = asyncHandler(async (req, res) => {

    const { area, timeFrom, timeTo } = req.body;

    console.log("data came", timeFrom, timeTo)


    // if (validateRequest(res,area, timeFrom, timeTo)) { return; }

    // https://www.mongodb.com/community/forums/t/overlapping-dateranges/12296/5

    console.log('area came get', area);



    try {
        await Spots.aggregate([
                { $match: {"area":area} },
                // Join the person and bookings collections
                {
                    $lookup: {
                        from: "bookings",
                        localField: "_id",
                        foreignField: "spot_id",
                        as: "bookings"
                    }
                },
                // Filter the bookings to only include those where timeFrom and timeTo is not equal or not within the range of the given ti
                //     "bookings.timeFrom": { $gte: fromTime, $lte: toTime }
                // meFrom and timeTo
                {
                    $project: {
                        area:1,
                        spot:1,
                        location:1,
                        bookings: {
                            $filter: {
                                input: "$bookings",
                                as: "booking",
                                cond:
                                    {

                                    }
                            }
                        }
                    }
                },
                // Count the number of bookings for each person
                {
                    $group: {
                        _id: "$_id",
                        area: { $first: "$area" },
                        location: { $first: "$location" },
                        spot: { $first: "$spot" },
                        bookings:{$first:"$bookings"},
                        booking_count: {
                            $sum: {
                                $size: "$bookings"
                            }
                        }
                    },

                },

            { $sort: { spot: -1 } }


            ]


        ).exec((err, result) => {
            if(result) {
                res.status(200).json(result);
            }
            if(err) {
                res.status(400).json(err);
            }
        })

    } catch (error) {
        res.status(400).json(error);
    }




    return  true;

    console.log('came here as well')





    try {
        await Spots.aggregate(
            [
                { $match: {"area":area} },
                {
                    $lookup: {
                        from: "bookings",
                        localField: "_id",
                        foreignField: "spot_id",
                        as: "bookings"
                    }
                },
                {
                    $match: {
                        $or: [
                            {
                                "bookings.timeFrom": { $eq: timeFrom }
                            },
                            {
                                "bookings.timeTo": { $eq: timeTo }
                            },
                            {
                                "bookings.timeFrom": { $gte: timeFrom, $lte: timeTo }
                            },
                            {
                                "bookings.timeTo": { $gte: timeFrom, $lte: timeTo }
                            }
                        ]
                    }
                },

                {
                    $group: {
                        _id: "$_id",

                        bookingsCount: { $sum: { $size: "$bookings" } }
                    }
                }
            ]
        ).exec((err, result) => {
            if(result) {
                res.status(200).json(result);
            }
            if(err) {
                res.status(400).json(err);
            }
        })

    } catch (error) {
        res.status(400).json(error);
    }



    return true;


    try {
        await Spots.aggregate(
            [
                { $match: {"area":area} },
                {
                    $lookup: {
                        from: "bookings",
                        localField: "_id",
                        foreignField: "spot_id",
                        as: "bookings"
                    }
                },
                {
                    $match: {
                        "bookings.timeFrom": { $not: { $eq: fromTime } },
                        "bookings.timeTo": { $not: { $eq: toTime } },
                        $nor: [
                            {
                                "bookings.timeFrom": { $gte: fromTime, $lte: toTime }
                            },
                            {
                                "bookings.timeTo": { $gte: fromTime, $lte: toTime }
                            }
                        ]
                    },

                }

            ]
        ).exec((err, result) => {
            if(result) {
                res.status(200).json(result);
            }
            if(err) {
                res.status(400).json(err);
            }
        })

    } catch (error) {
        res.status(400).json(error);
    }




    // perfectly working piece of code
    try {
        await Spots.aggregate(
            [
                { $match: {"area":area} },
                {
                    $lookup: {
                        from: "bookings",
                        localField: "_id",
                        foreignField: "spot_id",
                        as: "bookings"
                    }
                },
                {
                    $addFields: {
                        area: "$area",
                        location: "$location",
                        spot: "$spot"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        area: { $first: "$area" },
                        location: { $first: "$location" },
                        spot: { $first: "$spot" },
                        status: { $sum: { $size: "$bookings" } }
                    }
                }
            ]
        ).exec((err, result) => {
            if(result) {
                res.status(200).json(result);
            }
            if(err) {
                res.status(400).json(err);
            }
        })

    } catch (error) {
        res.status(400).json(error);
    }






    //
    // try {
    //    await Spots.aggregate([
    //        { $match: {"area":area} },{
    //             $lookup: {
    //                 from:"bookings",
    //                 as: "bookings",
    //                 let: {spot_id:"$_id"},
    //                 pipeline:[
    //                     {$match: { "timeFrom": "02:00" } },
    //                     {$match:{$expr: {$eq: ['$spot_id', '$$spot_id']}}}
    //                 ]
    //             }
    //         },
    //         {
    //             $project: {
    //                 _id : 0 ,
    //                 area:1,
    //                 location:1,
    //                 spot:1,
    //                 status: { $cond: { if: { $isArray: "$bookings" }, then: { $size: "$bookings" }, else: 0} }
    //             }
    //         }
    //     ]).exec((err, result) => {
    //         if(result) {
    //             res.status(200).json(result);
    //         }
    //         if(err) {
    //             res.status(400).json(err);
    //         }
    //     })
    //
    // } catch (error) {
    //     res.status(400).json(error);
    // }
    //



});



module.exports = {
    getSpots
};
