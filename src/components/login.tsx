import React, { useState } from "react";
import loginImg from "../assets/img/loginIMG.jpg";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/slices/authSlice";

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ngăn reload page
    dispatch(login({ email: username, password }));
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-[900px] max-w-full">
        {/* Left: Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-2 ">Hola,</h1>
          <h1 className="text-3xl font-extrabold mb-2">Welcome Back!</h1>
          <p className="text-gray-500 mb-8">
            Hey! Welcome back to your special piace
          </p>

          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm text-center mb-2">
                {error}
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="10" width="12" height="10" rx="2" />
                  <path d="M12 16v-4" />
                  <circle cx="12" cy="7" r="2" />
                </svg>
              </span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-indigo-500" />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="text-indigo-500 hover:underline hover:text-red-300"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Sign in"}
            </button>

            <div className="text-center text-sm text-gray-600">
              <span>Don't have an account? </span>
              <button
                type="button"
                className="text-indigo-500 hover:underline font-medium"
                onClick={onSwitchToRegister}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className="w-1/2">
          <img
            src={loginImg}
            alt="img_login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
