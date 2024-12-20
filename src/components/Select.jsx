/* eslint-disable react/prop-types */

const Select = ({ register, errors }) => {
    return (
        <>
            <label
                htmlFor="genders"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Gender *
            </label>
            <select
                {...register("gender")}
                id="genders"
                defaultValue=""
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="femail">Female</option>
                <option value="other">Other</option>
            </select>
            <p className="text-red-500 mb-4">{errors.gender?.message}</p>
        </>

    )
}

export default Select