/* eslint-disable react-hooks/exhaustive-deps */
import AdminFeature from "./AdminFeature"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { GetAllUsers } from "../features/auth/authAction"
import AdminTableData from "./AdminTableData"
import Pagination from "./Pagination"
import Spinner from "./Spinner"
import InputSearch from "./InputSearch"

const AdminPanel = () => {
  const { users, totalPages, currentPage, isLoading, totalUsers, activeUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchAllUsers = async (currentPage) => {
    await dispatch(GetAllUsers(currentPage));
  };

  useEffect(() => {
    fetchAllUsers(currentPage);
  }, [dispatch, currentPage]);

  return (
    <div className="relative font-[sans-serif] min-h-screen flex flex-col">
      <div>
        <div className="flex items-start">
          <section className="main-content w-full overflow-auto p-6">
            <div className="overflow-x-auto">
              <AdminFeature totalUsers={totalUsers} activeUsers={activeUsers} />
              <InputSearch />
              {
                isLoading ? <Spinner /> :
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 whitespace-nowrap">
                      <tr>
                        <th className="p-4 text-left text-sm font-medium text-white">
                          Name
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-white">
                          Email
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-white">
                          Role
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-white">
                          Status
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                      {
                        users?.map((user) => {
                          return user.role !== "admin" && <AdminTableData key={user._id} {...user} />;
                        })
                      }
                    </tbody>
                  </table>
              }
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => dispatch(GetAllUsers(page))}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel