import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useSignUp } from "../hooks/useSignUp";
import { authService } from "../../../services/authServices";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const signUpData = await signUpMutation.mutateAsync({
        name,
        email,
        password,
      });

      if (signUpData && signUpData.user) {
        if (signUpData.access_token) {
          // Có cả user và token, đăng nhập ngay
          login(signUpData);
          toast.success("Đăng ký thành công");
          navigate("/dashboard");
        } else {
          // Tài khoản được tạo nhưng không có token, tự động login để lấy token
          try {
            const loginData = await authService.login({ email, password });
            if (loginData && loginData.user && loginData.access_token) {
              login(loginData);
              toast.success("Đăng ký thành công");
              navigate("/dashboard");
            } else {
              // Login thất bại, redirect về trang login
              toast.success("Tài khoản đã được tạo, vui lòng đăng nhập");
              navigate("/");
            }
          } catch (loginErr) {
            // Login thất bại, redirect về trang login
            toast.success("Tài khoản đã được tạo, vui lòng đăng nhập");
            navigate("/");
          }
        }
      } else {
        setErrorMessage("Đăng ký thất bại!");
        toast.error("Đăng ký thất bại");
      }
    } catch (err: any) {
      console.error("Sign up error details:", err);
      // Kiểm tra nếu error message cho biết user đã tồn tại hoặc tương tự
      if (
        err?.response?.data?.message?.includes("already exists") ||
        err?.message?.includes("already exists")
      ) {
        setErrorMessage("Email đã được sử dụng!");
      } else {
        setErrorMessage(
          err?.response?.data?.message || err?.message || "Đăng ký thất bại!"
        );
      }
      toast.error("Đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-[900px] max-w-full">
        {/* Left: Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-2">Create Account,</h1>
          <h1 className="text-3xl font-extrabold mb-2">Welcome!</h1>
          <p className="text-gray-500 mb-8">
            Join us and start your journey today
          </p>

          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="text-red-500 text-sm text-center mb-2">
                {errorMessage}
              </div>
            )}

            {/* Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                  <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                required
                autoComplete="new-password"
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

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition disabled:opacity-60"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? "Đang đăng ký..." : "Sign up"}
            </button>

            <div className="text-center text-sm text-gray-600">
              <span>Already have an account? </span>
              <button
                type="button"
                className="text-indigo-500 hover:underline font-medium"
                onClick={() => navigate("/")}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
