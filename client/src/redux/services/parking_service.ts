import axios from "axios";
import {Booking, Spot, SpotData} from "../../types";

const API_URL = "/api";

async function getSpots(spot: SpotData) {

    console.log('came to spots service', spot);
    const user = await getUser();

    const {data} = await axios.post<Spot>(
        `${API_URL}/spots/feed`,
        spot,
        {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }
    );
    return data;

}

async function createBooking(booking: Booking) {

    const user = await getUser();
    booking["user_id"] = user._id;

    const data = await axios.post<Booking>(
        `${API_URL}/bookings/create`,
        booking,
        {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }
    );
    return data;
}

async function getBookings() {
    const user = await getUser();
    const {data} = await axios.get(`${API_URL}/bookings/feed`, {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });
    return data;
}

async function getUser() {
    return await JSON.parse(localStorage.getItem("user") as string);
}

export const parkingService = {
    getSpots,
    createBooking,
    getBookings
};
