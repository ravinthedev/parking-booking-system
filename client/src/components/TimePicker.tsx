import React from "react";
import {TimePickerTypes} from "../types";

function TimePicker({area, fromTime, toTime, onChangeTime, onChangeFromTime, updateSpots}: TimePickerTypes) {

    const times = [];
    for (let i = 1; i <= 24; i++) {
        times.push(i)
    }

    return (

        <div className="grid grid-cols-12 gap-2">

            <div className="col-start-1 col-end-4">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="email">Time From:</label>
                    <select
                        className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
                        value={fromTime} onChange={(e) => onChangeFromTime(e.target.value)}>
                        {times.map((el, i) => <option value={el} key={i}>{el}:00</option>
                        )}
                    </select>
                </div>
            </div>

            <div className="col-start-4 col-end-8">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="toTime">Time To:</label>
                    <select
                        className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
                        value={toTime} onChange={(e) => onChangeTime(e.target.value)}>
                        {times.map((el, i) => <option value={el} key={i}>{el}:00</option>
                        )}
                    </select>
                </div>

            </div>

            <div className="col-start-8 col-end-13">
                <button onClick={(e) => updateSpots(area)}
                        className="block bg-black text-white py-1.5 pr-10 pl-10  hover:shadow-md hover:scale-105 transform transition-all duration-200 mt-7 ml-2">
                    View Slots
                </button>
            </div>

        </div>

    );
}

export default TimePicker;