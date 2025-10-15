import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../../../../public/assets/login.jpg";
import { useAuth } from "../context/AuthProvider";
import { authService } from "../../../services/authServices";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    
    try {
      setIsSubmitting(true);
      try {
        const loginData = await authService.login({ email, password });
        if (loginData && loginData.user && loginData.access_token) {
          login(loginData);
          toast.success("Đăng nhập thành công");
          navigate("/dashboard");
        } else {
          setErrorMessage("Sai tài khoản hoặc mật khẩu!");
          toast.error("Đăng nhập thất bại");
        }
      } catch (err) {
        setErrorMessage("Sai tài khoản hoặc mật khẩu!");
        toast.error("Đăng nhập thất bại");
      }
      setIsSubmitting(false);
    } catch (err: any) {
      console.error("Login error details:", err);
      setErrorMessage("Tài khoản hoặc mật khẩu sai!");
      toast.error("Đăng nhập thất bại");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-[900px] max-w-full">
        {/* Left: Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-2 ">Hola,</h1>
          <h1 className="text-3xl font-extrabold mb-2">Welcome Back!</h1>
          <p className="text-gray-500 mb-8">
            Hey! Welcome back to your special place
          </p>

          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="text-red-500 text-sm text-center mb-2">
                {errorMessage}
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
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

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang đăng nhập..." : "Sign in"}
            </button>

            <div className="text-center text-sm text-gray-600">
              <span>Don't have an account? </span>
              <button
                type="button"
                className="text-indigo-500 hover:underline font-medium"
                onClick={() => console.log("Switch to Register")}
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
