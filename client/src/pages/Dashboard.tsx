import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {getSpots} from "../redux/slices/spots";
import Slot from "../components/Slot";
import TimePicker from "../components/TimePicker";
import {toast} from "react-toastify";
import {reset} from "../redux/slices/auth";


function Dashboard() {

    const {user} = useAppSelector((state) => state.auth);
    const {spots} = useAppSelector((state) => state.spots);

    const dispatch = useAppDispatch();

    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [area, setArea] = useState("1");

    const navigate: NavigateFunction = useNavigate();

    useEffect((): any => {
        if (!user) {
            navigate("/login");
        } else {
        }
        return dispatch(reset());
    }, [navigate, user, dispatch]);


    function updateSpots(area: string) {
        // Using the selected area retrieving all parking slots with their availability in one api request
        setArea(area);

        const SlotData = {
            area: Number(area),
            fromTime: Number(fromTime),
            toTime: Number(toTime),
        }
        if (SlotData.fromTime >= SlotData.toTime) {
            toast.error("Please select a valid time range");
        } else {
            console.log('dispatching data', SlotData)
            dispatch(getSpots(SlotData));
        }
    }

    function createBooking(data: any) {
        // Creating a booking and redirecting to BookingForm with necessary data
        console.log('create booking data', data)
        const bookingData = {
            id: data._id,
            area: Number(data.area),
            spot: Number(data.spot),
            fromTime: Number(fromTime),
            toTime: Number(toTime),
        }
        console.log('mybooking data', bookingData)
        navigate('/book', {state: bookingData});
    }

    return (
        <div className="max-w-4xl mx-auto px-3">

            <section className="space-y-2 py-5">
                <h1 className="text-xl font-bold">Hi {user?.name}!</h1>
                <p className="text-md font-bold text-gray-600">Please select your preferred time slot to view parking
                    availability.</p>
            </section>

            <TimePicker area={area} updateSpots={(ev: any) => updateSpots(ev)} fromTime={fromTime} toTime={toTime}
                        onChangeTime={(ev: any) => setToTime(ev)} onChangeFromTime={(ev: any) => setFromTime(ev)}/>

            {spots.length > 0 ? (<div className="grid grid-cols-12 mt-10">

                <div className="col-start-1 col-end-4">

                    <button onClick={() => {
                        updateSpots('1')
                    }} className={"block bg-gray-400 text-white py-2 w-8/12 mb-3 " + (area === '1' ? 'selected' : '')}>
                        Area 1
                    </button>

                    <button onClick={() => {
                        updateSpots('2')
                    }} className={"block bg-gray-400 text-white py-2 w-8/12 mb-3 " + (area === '2' ? 'selected' : '')}>
                        Area 2
                    </button>

                    <button onClick={() => {
                        updateSpots('3')
                    }} className={"block bg-gray-400 text-white py-2 w-8/12 " + (area === '3' ? 'selected' : '')}>
                        Area 3
                    </button>

                </div>
                <div className="col-start-4 col-end-13">

                    <div className="grid grid-cols-4 gap-4 border-2 p-2">
                        {spots.map((el) => <Slot createBooking={(ev: any) => createBooking(ev)} key={el._id} data={el}/>
                        )}
                    </div>

                </div>
            </div>) : ""}
            <div>
                <div className="pt-5"></div>
            </div>
        </div>
    );
}

export default Dashboard;
