/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { DeleteUser, UpdateUserStatus } from '../features/auth/authAction';
import toast from 'react-hot-toast';


const AdminTableData = (props) => {
    const { _id, firstName, middleName, email, role, isActive } = props;
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const formData = {
            status: data,
            id: _id
        };
        const { payload } = await dispatch(UpdateUserStatus(formData));
        if (payload.success) {
            return toast.success(payload.message);
        };

        return toast.success("Could not update status");
    };

    const handleDelete = async () => {
        const { payload } = await dispatch(DeleteUser(_id));
        if(payload.success){
            return toast.success(payload.message);
        };
        return toast.error("Could Not Delete User");
    };

    return (
        <tr className="even:bg-blue-50">
            <td className="p-4 text-sm text-black">{firstName + " " + middleName}</td>
            <td className="p-4 text-sm text-black">{email}</td>
            <td className="p-4 text-sm text-black">{role}</td>
            <td className="p-4 text-sm text-black">
                <form>
                    <select defaultValue={isActive} {...register("isActive")} onChange={(e) => handleSubmit(onSubmit(e.target.value))}>
                        <option value={true} >Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </form>
            </td>
            <td className="p-4">
                <button className="mr-4" title="Delete" onClick={handleDelete}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 fill-red-500 hover:fill-red-700"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                        />
                        <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                        />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default AdminTableData