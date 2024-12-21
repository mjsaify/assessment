import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { LogoutUser } from "../features/auth/authAction";
import toast from "react-hot-toast";
import { useState } from "react";

const AdminNavbar = ({isOpen}) => {
    const dispatch = useDispatch();



    const handleLogout = async () => {
        const { payload } = await dispatch(LogoutUser());
        return toast.success(payload.message);
    };
    return (
        <>
            <nav
                className={`fixed top-16 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-[-100%]" : "translate-x-[0]"
                    } transition-transform duration-300 z-50`}
            >
                <div className="py-6 px-4">
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/dashboard"
                                className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z" />
                                    <path d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z" />
                                </svg>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-6">
                        <h6 className="text-blue-600 text-sm font-bold px-4">Actions</h6>
                        <ul className="mt-3 space-y-4">
                            <li>
                                <Link
                                    to="/profile"
                                    className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                                >
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar