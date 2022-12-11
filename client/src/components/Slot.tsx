import {SlotTypes} from "../types";
import React from "react";

function Slot({createBooking, data}: SlotTypes) {

    return (
        <div>
            {data.spot ? (
                <div className="spot"> Parking Spot {data.spot}
                    {
                        data.booking_count > 0 ?
                            (<div style={{
                                backgroundColor: "red",
                                height: "100%",
                                position: "absolute",
                                width: "100%",
                                top: 0,
                                opacity: 0.5
                            }}></div>)
                            :
                            <div className="booked"
                                 onClick={(e) => createBooking(data)}
                            ></div>
                    }
                </div>
            ) : (
                <div>

                </div>

            )}

        </div>

    );
}

export default Slot;