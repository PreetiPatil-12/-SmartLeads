import {
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
  FaUserShield,
} from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-72 bg-[#111827] text-white min-h-screen p-6 flex flex-col justify-between sticky top-0">
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-400">
            Smart Leads
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Lead Management System
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center gap-4 bg-blue-600 p-4 rounded-2xl font-medium">
            <FaChartBar />
            Dashboard
          </button>

          <button className="w-full flex items-center gap-4 hover:bg-gray-800 p-4 rounded-2xl transition">
            <FaUsers />
            Leads
          </button>

          <button className="w-full flex items-center gap-4 hover:bg-gray-800 p-4 rounded-2xl transition">
            <FaUserShield />
            Analytics
          </button>
        </div>
      </div>

      <div>
        <div className="bg-gray-800 rounded-2xl p-4 mb-5">
          <p className="font-semibold">{user?.name}</p>

          <p className="text-gray-400 text-sm capitalize">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 transition p-4 rounded-2xl flex items-center justify-center gap-3 font-semibold"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;