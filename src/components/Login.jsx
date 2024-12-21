import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLoginZodSchema } from "../utils/_types";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../features/auth/authAction";
import { useEffect } from "react";

const Login = () => {
    const { isLoading, user, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(UserLoginZodSchema), defaultValues: { email: "admin@gmail.com", password: "Admin@123"} });

    const onSubmit = async (data) => {
        const response = await dispatch(LoginUser(data));
        if (response.error) {
            return toast.error(response.payload.response.data?.message);
        };

        return toast.success(response.payload?.message);
    };

    // when user visits login page it checks if the user is loggedin, if user is present it redirects to the profile page, and stops the loggedin user fro accessing login page
    useEffect(() => {
        if (user) {
            if (role === "user") {
                navigate("/profile", { replace: true });
            } else if (role === "admin") {
                navigate("/dashboard", { replace: true });
            }
        }
    }), [user, navigate];


    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">
                            Login
                        </h2>
                        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Email
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        {...register("email")}
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter email"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx={10} cy={7} r={6} data-original="#000000" />
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                                <p className="text-red-500 mb-4">{errors.email?.message}</p>
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        {...register("password")}
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter password"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4 cursor-pointer"
                                        viewBox="0 0 128 128"
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                                <p className="text-red-500 mb-6">{errors.password?.message}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 justify-end">
                                <div className="text-sm">
                                    <Link
                                        to='/forgot-password'
                                        className="text-blue-600 hover:underline font-semibold"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                            <div className="!mt-8">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                >
                                    {isLoading ? "Please wait..." : "Submit"}
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">
                                Don&apos;t have an account?{" "}
                                <Link to="/signup"
                                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                >
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login