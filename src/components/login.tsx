import loginImg from "../assets/img/login.png";

const Login = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 w-full">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-[900px] max-w-full">
        
        {/* Left: Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Holla,</h1>
          <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
          <p className="text-gray-500 mb-6 ">Hey, welcome back to your special place</p>

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-indigo-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-indigo-500 hover:underline hover:text-red-300">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition">
              Sign in
            </button>

            <div className="text-center text-sm text-gray-600">
              <span>Don't have an account? </span>
              <a href="#" className="text-indigo-500 hover:underline font-medium">
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-1/2">
          <img src={loginImg} alt="img_login" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
