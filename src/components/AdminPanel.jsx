import AdminFeature from "./AdminFeature"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { GetAllUsers } from "../features/auth/authAction"
import AdminHeader from "./AdminHeader"
import AdminTableData from "./AdminTableData"
import AdminNavbar from "./AdminNavbar"
import Pagination from "./Pagination"
import Spinner from "./Spinner"

const AdminPanel = () => {
  const [users, setUsers] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const { currentPage, isLoading } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility
};

  const fetchAllUsers = async (currentPage) => {
    const { payload } = await dispatch(GetAllUsers(currentPage));
    setUsers(payload.data);
  };

  useEffect(() => {
    fetchAllUsers(currentPage);
  }, [dispatch, currentPage]);

  return (
    <div className="relative font-[sans-serif] pt-[70px] h-screen">
      <AdminHeader toggleSidebar={toggleSidebar} isOpen={isOpen}/>
      <div>
        <div className="flex items-start">
          <AdminNavbar isOpen={isOpen}/>
          <section className="main-content w-full overflow-auto p-6">
            <div className="overflow-x-auto">
              <AdminFeature totalUsers={users?.totalUsers} activeUsers={users?.activeUsers} />
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
                        users?.users.map((user) => {
                          return user.role !== "admin" && <AdminTableData key={user._id} {...user} />;
                        })
                      }
                    </tbody>
                  </table>
              }
            </div>
            <Pagination
              totalPages={users?.totalPages}
              currentPage={users?.currentPage}
              onPageChange={(page) => dispatch(GetAllUsers(page))}
            />

          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel