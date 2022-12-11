const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
    {
        area: {
            type: Number,
        },
        spot: {
            type: Number,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
        spot_id: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Spots'
        },
        timeFrom: {
            type: Number,
            required: [true, "time from is required"]
        },
        timeTo: {
            type: Number,
            required: [true, "time to is required"]
        },
        status: {
            type: Number,
            default: 1
        },
        created_at: {
            type: Date,
            default: Date.now
        }

    },
    { collection: 'bookings' }

);


module.exports = mongoose.model("Bookings", bookingSchema);
