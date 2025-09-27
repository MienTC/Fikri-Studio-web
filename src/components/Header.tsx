
const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-between bg-white p-4 border-b-1 border-gray-100">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Export CSV
          </button>
        </div>
    </div>
  )
}

export default Header
