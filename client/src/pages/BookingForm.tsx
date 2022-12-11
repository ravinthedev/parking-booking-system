import React, {useEffect, useState} from "react";
import Spinner from "../components/Spinner";
import {Booking} from "../types";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {parkingService} from "../redux/services/parking_service";
import {reset} from "../redux/slices/auth";

function BookingForm() {
    const {user} = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    useEffect((): any => {
        if (!user) {
            navigate("/login");
        } else {
        }
        return dispatch(reset());
    }, [navigate, user, dispatch]);

    const {state} = useLocation() as any;

    const [formData] = useState<Pick<Booking, "area" | "spot" | "fromTime" | "toTime" | "id" | "user_id" | "data">>({
        area: state.area,
        spot: state.spot,
        fromTime: state.fromTime,
        toTime: state.toTime,
        id: state.id,
        user_id: state.user_id,
        data: state.data
    });


    const {isLoading} = useAppSelector(
        (state) => state.auth
    );

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        initiateBooking();
    };

    async function initiateBooking() {
        const response = await parkingService.createBooking(formData);
        if (response.status === 200) {
            toast.success("Booking creation successful.");
            navigate("/list");
        } else {
            toast.error("Booking creation unsuccessful.");
        }
    }

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <div>

            <div className="max-w-md mx-auto px-3 mt-10">

                <form onSubmit={onSubmit} className="space-y-2">
                    <div className="grid grid-cols-12 gap-2">

                        <div className="col-start-1 col-end-7">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="email">Area</label>
                                <input
                                    disabled
                                    type="number"
                                    name="area"
                                    className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
                                    value={formData.area}

                                />
                            </div>

                        </div>
                        <div className="col-start-7 col-end-13">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="password">Spot</label>
                                <input
                                    disabled
                                    type="number"
                                    name="spot"
                                    className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
                                    value={formData.spot}

                                />
                            </div>

                        </div>

                        <div className="col-start-1 col-end-7">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="email">Time From:</label>
                                <input
                                    disabled
                                    type="text"
                                    name="timeFrom"
                                    className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
                                    value={formData.fromTime + ":00"}

                                />
                            </div>

                        </div>
                        <div className="col-start-7 col-end-13">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="password">Time To:</label>
                                <input
                                    disabled
                                    type="text"
                                    name="timeTo"
                                    className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
                                    value={formData.toTime + ":00"}

                                />
                            </div>

                        </div>

                        <div className="col-start-1 col-end-13">
                            <button
                                className="block bg-black text-white py-2 w-full hover:shadow-md hover:scale-105 transform transition-all duration-200 mt-5">
                                Book Parking
                            </button>
                        </div>

                    </div>

                </form>

            </div>
        </div>
    )

}

export default BookingForm;