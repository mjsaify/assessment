/* eslint-disable react/prop-types */

const AdminFeature = ({ totalUsers, activeUsers }) => {
    return (
        <div>
            <div className="max-w-6xl mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-md:max-w-md mx-auto">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                        <div className="p-8">
                            <h3 className="text-gray-800 text-xl font-semibold mb-3">
                                Total Users
                            </h3>
                            <p className="text-gray-500 text-md font-semibold leading-relaxed">
                                {totalUsers}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                        <div className="p-8">
                            <h3 className="text-gray-800 text-xl font-semibold mb-3">
                                Active Users
                            </h3>
                            <p className="text-gray-500 text-md font-semibold leading-relaxed">
                                {activeUsers}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminFeature