import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUserProfile, UpdateUserProfile } from "../features/auth/authAction";
import toast from 'react-hot-toast';


const Profile = () => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const [profileImage, setProfileImage] = useState(null);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            }
            reader.readAsDataURL(file); // Convert file to Base64 for preview
        }
    };
    const removeImage = () => {
        setProfileImage(null);
    };

    const onSubmit = async (data) => {
        data.profileImage = profileImage;
        const { payload } = await dispatch(UpdateUserProfile(data))
        if (payload.success) {
            return toast.success(payload.message);
        };
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            const { payload } = await dispatch(DeleteUserProfile());
            if (payload.success) {
                return toast.success(payload.message);
            };
            return toast.error(payload.response.data.message);
        };
    };

    useEffect(()=>{
        setProfileImage(profileImage ? profileImage : user?.profileImage);
    },[]);

    return (
        <div className="container mx-auto lg:px-8 max-md:px-4 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <svg
                                className="w-full h-full text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                            Upload Picture
                            <input
                                type="file"
                                className="hidden w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                accept="image/jpeg,image/png"
                                onChange={handleImageChange}
                            />
                        </label>
                        {profileImage && (
                            <button
                                type="button"
                                onClick={removeImage}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="text-gray-800 text-sm mb-2 block"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            {...register("firstName", { value: user?.firstName })}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="middleName"
                            className="text-gray-800 text-sm mb-2 block"
                        >
                            Middle Name
                        </label>
                        <input
                            type="text"
                            id="middleName"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            {...register("middleName", { value: user?.middleName })}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="text-gray-800 text-sm mb-2 block"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            {...register("lastName", { value: user?.lastName })}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-gray-800 text-sm mb-2 block">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            {...register("email", { value: user?.email })}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="text-gray-800 text-sm mb-2 block">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            id="phone"
                            pattern="[0-9]{10}"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            {...register("phone", { value: user?.phone })}
                            placeholder="1234567890"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="altPhone"
                            className="text-gray-800 text-sm mb-2 block"
                        >
                            Alternate Phone Number
                        </label>
                        <input
                            type="number"
                            id="altPhone"
                            pattern="[0-9]{10}"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            {...register("alternatePhone", { value: user?.alternatePhone })}
                            placeholder="1234567890"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="genders"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Gender
                        </label>
                        <select
                            {...register("gender", { value: user?.gender })}
                            id="gender"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        >
                            <option value="">Select a gender</option>
                            <option value="male">Male</option>
                            <option value="femail">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="dateOfBirth"
                            className="text-gray-800 text-sm mb-2 block"
                        >
                            Date of Birth
                        </label>
                        <input
                            type="text"
                            {...register("dob", { value: new Date(user?.dob).toLocaleDateString() })}
                            id="dateOfBirth"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label
                            htmlFor="addressLine1"
                            className="text-gray-800 text-sm mb-2 block"
                        >
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            id="addressLine1"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            {...register("address1", { value: user?.address1 })}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label
                            htmlFor="addressLine2"
                            className="text-gray-800 text-sm mb-2 block"
                        >
                            Address Line 2
                        </label>
                        <input
                            type="text"
                            id="addressLine2"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            {...register("address2", { value: user?.address2 })}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        disabled={isLoading}
                    >
                        Delete Profile
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? "Please wait..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
