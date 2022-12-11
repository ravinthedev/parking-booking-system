import React from "react";
import {useLocation} from 'react-router-dom';

function Breadcumbs() {

    const location = useLocation();

    return (
        <nav className="grid place-content-center flex-wrap mt-4 pb-4">

            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a href="/"
                       className={"menu-item mr-4 " + (location.pathname === '/' ? 'active' : '')}>
                        View Parking
                    </a>
                    <a href="#"
                       className={"menu-item mr-4 " + (location.pathname === '/book' ? 'active' : '')}>
                        Book Parking
                    </a>
                    <a href="/list"
                       className={"menu-item mr-4 " + (location.pathname === '/list' ? 'active' : '')}>
                        View Bookings
                    </a>
                </div>
                <div>
                    <a href="#"
                       className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
                </div>
            </div>

        </nav>
    )

}

export default Breadcumbs;