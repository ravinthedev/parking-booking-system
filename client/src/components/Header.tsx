import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {LogoutIcon, UserAddIcon} from "@heroicons/react/outline";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {logout, reset} from "../redux/slices/auth";
import {toast} from "react-toastify";
import React, {useEffect} from "react";
import Breadcumbs from "./Breadcumbs";

function Header() {
    const {user, message, isSuccess, isError} = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
        }
        if (isError) {
            toast.error(message);
        }
    }, [isError, message, isSuccess]);

    const signOut = () => {
        navigate("/login");
        dispatch(logout());
        dispatch(reset());
    };

    return (

        <div>
            <header className="p-5 flex items-center border-b">
                <div className="">
                    <Link to="/"><span style={{fontSize: 18, fontWeight: 600}}>Parking APP</span></Link>
                </div>

                <ul className="flex items-center space-x-6 flex-grow justify-end">
                    {user ? (
                        <li>
                            <button
                                onClick={signOut}
                                className="flex items-center space-x-2 bg-red-600 hover:bg-red-500 active:bg-red-700 px-4 py-1 text-white">
                                <LogoutIcon className="h-6"/> <span className="">Logout</span>
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link className="flex items-center space-x-2" to="/login">
                                    <LogoutIcon className="h-6"/> <span className="">Login</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="flex items-center space-x-2" to="/register">
                                    <UserAddIcon className="h-6"/>{" "}
                                    <span className="">Register</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

            </header>

            {user ? (<Breadcumbs/>) : ('')}

            <hr/>

        </div>

    );
}

export default Header;