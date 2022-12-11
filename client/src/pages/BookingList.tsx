
import React, {useEffect} from "react";
import {parkingService} from "../redux/services/parking_service";

import moment from "moment";

function BookingList() {

    const [data, setData] = React.useState<any[]>([])
    useEffect(() => {


        async  function getBookings() {
            const data = await parkingService.getBookings();
            console.log({data});
            setData(data)
        }

        getBookings();

    }, []);





    return (
        <div className="max-w-4xl mx-auto px-3 mt-5">


            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                           Area
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Spot
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Date
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Start
                        </th>
                        <th scope="col" className="py-3 px-6">
                            End
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Duration
                        </th>

                    </tr>
                    </thead>
                    <tbody>


                    {data.map(d => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={d._id}>
                        <th scope="row"
                        className="py-4 px-6">
                        {d.area}
                        </th>
                        <td className="py-4 px-6">
                           Spot {d.spot}
                        </td>
                        <td className="py-4 px-6">

                            {moment(d.created_at).format("YYYY-MM-DD")}

                        </td>
                        <td className="py-4 px-6">
                            {d.timeFrom}:00
                        </td>
                        <td className="py-4 px-6">
                            {d.timeTo}:00
                        </td>
                        <td className="py-4 px-6">
                            {d.timeTo - d.timeFrom}h
                        </td>
                        </tr>

                    ))}







                    </tbody>
                </table>
            </div>


        </div>


    );
}

export default BookingList;