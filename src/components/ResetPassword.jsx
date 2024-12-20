import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PasswordResetZodSchema } from "../utils/_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordLink } from "../features/auth/authAction";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
    const { isLoading } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(PasswordResetZodSchema) });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");

    const onSubmit = async (data) => {
        data.token = token;
        const { payload } = await dispatch(ResetPasswordLink(data));
        if (payload.success) {
            toast.success(payload.data);
            return setTimeout(() => {
                navigate("/login");
            }, 1000);
        };
        return toast.error("Could not reset password");
    };
    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">
                            Reset Your Password
                        </h2>
                        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    New Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        {...register("newPassword")}
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <p className="text-red-500 mb-4">{errors.newPassword?.message}</p>
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Confirm Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        {...register("confirmPassword")}
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter confirm password"
                                    />
                                </div>
                                <p className="text-red-500 mb-4">{errors.confirmPassword?.message}</p>
                            </div>
                            <div className="!mt-8">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Please wait..." : "Reset now"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword