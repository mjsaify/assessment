/* eslint-disable react/prop-types */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <ul className="flex space-x-5 justify-center my-8">
            <li
                className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold ${currentPage === 1 ? "text-gray-400" : "text-blue-600"
                    } h-9 rounded-md`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            >
                Prev
            </li>
            {pages.map((page) => (
                <li
                    key={page}
                    className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold ${currentPage === page ? "bg-blue-500 text-white" : "text-gray-800"
                        } px-[13px] h-9 rounded-md`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </li>
            ))}
            <li
                className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold ${currentPage === totalPages ? "text-gray-400" : "text-blue-600"
                    } h-9 rounded-md`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            >
                Next
            </li>
        </ul>
    );
};

export default Pagination;
