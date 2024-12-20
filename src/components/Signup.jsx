import { Link, useNavigate } from "react-router-dom"
import Select from "./Select"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSignupZodSchema } from "../utils/_types";
import { RegisterUser } from "../features/auth/authAction";
import toast from "react-hot-toast";


const Signup = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(UserSignupZodSchema) });
    const dispatch = useDispatch();

    const onSubmit = async (data) =>{
        const { payload } = await dispatch(RegisterUser(data));
        if(payload.success) {
            toast.success(payload.message);
            return setTimeout(() => {
                navigate("/login");
            }, 1000);
        };
        return toast.error(payload.response.data.message);
    };



    useEffect(() => {
        if (user) navigate("/profile");
    }, [user, navigate]);
    return (
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6 mb-16">
            <div className="text-center mb-16">
                <h4 className="text-gray-800 text-center text-2xl font-bold mt-6">
                    Sign up into your account
                </h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">First Name *</label>
                        <input
                            {...register("firstName")}
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter first name"
                        />
                        <p className="text-red-500 mb-4">{errors.firstName?.message}</p>
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Middle Name *</label>
                        <input
                            {...register("middleName")}
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter middle name"
                        />
                        <p className="text-red-500 mb-4">{errors.middleName?.message}</p>
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                        <input
                            {...register("lastName")}
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter last name"
                        />
                    </div>
                    <div>
                        <Select register={register} errors={errors}/>
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Email Id *</label>
                        <input
                            {...register("email")}
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter email"
                        />
                        <p className="text-red-500 mb-4">{errors.email?.message}</p>
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">DOB *</label>
                        <input
                            {...register("dob")}
                            type="date"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter dob"
                        />
                        <p className="text-red-500 mb-4">{errors.dob?.message}</p>
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Mobile No *</label>
                        <input
                            {...register("phone")}
                            type="number"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter mobile number"
                        />
                        <p className="text-red-500 mb-4">{errors.phone?.message}</p>
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Alternate Mobile No</label>
                        <input
                            {...register("alternatePhone")}
                            type="number"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter alternate mobile number"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Password *</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter password"
                        />
                        <p className="text-red-500 mb-4">{errors.password?.message}</p>
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">
                            Confirm Password *
                        </label>
                        <input
                            {...register("cpassword")}
                            type="password"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="Enter confirm password"
                        />
                        <p className="text-red-500 mb-4">{errors.cpassword?.message}</p>
                    </div>
                    <div className="col-span-full">
                        <label className="text-gray-800 text-sm mb-2 block">
                            Address 1 *
                        </label>
                        <input
                            {...register("address1")}
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-4 rounded-md outline-blue-600"
                            placeholder="Enter address 1"
                        />
                        <p className="text-red-500 mb-4">{errors.address1?.message}</p>
                    </div>
                    <div className="col-span-full">
                        <label className="text-gray-800 text-sm mb-2 block">
                            Address 2
                        </label>
                        <input
                            {...register("address2")}
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-4 rounded-md outline-blue-600"
                            placeholder="Enter address 2"
                        />
                    </div>
                </div>
                <div className="!mt-12 flex justify-between">
                    <button
                        type="submit"
                        className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                        Sign up
                    </button>
                    <p className="text-gray-800 text-sm !mt-8 text-center">
                        Already have an account?
                        <Link to="/login"
                            className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>

    )
}

export default Signup