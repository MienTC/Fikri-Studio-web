
import { useAuth } from "../../features/auth/controller/AuthProvider";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-4 border-b-1 border-gray-100">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name || user?.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
    </div>
  )
}

export default Header
