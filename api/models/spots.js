const mongoose = require("mongoose");

const spotSchema = mongoose.Schema(
    {
        area: {
            type: Number,
            required: [true, "Please Add a number value"]
        },
        location: {
            type: Number,
            required: [true, "Please Add a number value"]
        },
        spot: {
            type: Number
        }
    },
    { collection: 'spots' }

);

module.exports = mongoose.model("Spots", spotSchema) ;
